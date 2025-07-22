import { useEffect, useLayoutEffect, useRef } from 'react';
import { Application, Text, Graphics, TextStyle, FederatedPointerEvent } from 'pixi.js';

type Enemy = Text & {
  vx: number;
  vy: number;
  evadeFactor: number; // individual sensitivity to bullet line
  dodgeCooldown: number; // delay timer in frames or milliseconds
};

const ABOUT_TEXTS = [
  "Frontend Dev",
  "Javascript Lover",
  "ReactJs",
  "React Native",
  "Typescript",
  "NextJs",
  "8+ yrs Experience",
  "Loves Clean UI",
  "Salatiga, ID",
  "QA Testing",
  "UIUX",
  "Problem Solver",
  "Creative Thinker",
];

export default function HeroInvadersCanvas() {
  const gameRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<Application>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useLayoutEffect(() => {
    const setupPixi = async () => {
      const app = new Application();
      await app.init({ background: '#0a0a0a', resizeTo: window });

      appRef.current = app;

      if (gameRef.current) {
        gameRef.current.appendChild(app.canvas);
      }

      // Create player
      const playerWidth = 40;
      const playerHeight = 40;
      const player = new Graphics()
        .moveTo(0, playerHeight)       // Bottom left
        .lineTo(playerWidth, playerHeight)      // Bottom right
        .lineTo(playerHeight/2, 0)       // Top center
        .closePath()        // Connect back to start
        .fill({color: 0x00ffcc})
      player.y = app.screen.height - 50;
      player.x = (app.screen.width - playerWidth) / 2;
      app.stage.addChild(player);

      // Move player & track mouse position
      let mouseX = 0;
      let mouseY = 0;
      app.stage.eventMode = 'static';
      app.stage.on('globalpointermove', (e: FederatedPointerEvent) => {
        player.x = e.global.x - playerWidth / 2;
        mouseX = e.global.x;
        mouseY = e.global.y;
      });

      // Create enemies (About Me texts)
      const enemies: Enemy[] = [];
      ABOUT_TEXTS.forEach((text, i) => {
        const style = new TextStyle({
          fill: 'white',
          fontSize: 20,
          fontWeight: 'bold',
        });

        const enemy = new Text({text: text, style: style}) as Enemy;
        enemy.x = 100 + i * 120;
        enemy.y = 50 + Math.random() * 100;
        enemy.vx = (Math.random() - 0.5) * 3;
        enemy.vy = (Math.random() - 0.5) * 4;
        enemy.evadeFactor = 0.8 + Math.random() * 0.6; // Between 0.8 and 1.4
        enemy.dodgeCooldown = 0; // ready to dodge
        app.stage.addChild(enemy);
        enemies.push(enemy);
      });

      // Bullets
      const bullets: Graphics[] = [];
      const shoot = () => {
        const bullet = new Graphics()
        .rect(0, 0, 4, 10)
        .fill({color: '0xff0000'});
        bullet.x = player.x + playerWidth / 2 - 2;
        bullet.y = player.y;
        bullets.push(bullet);
        app.stage.addChild(bullet);
      };

      window.addEventListener('keydown', (e) => {
        if (e.key === ' ') shoot();
      });

      // Game loop
      app.ticker.add(() => {
        // Move enemies
        enemies.forEach((enemy, i) => {
          // Random drift
          // Normal drift
          enemy.x += enemy.vx;
          enemy.y += enemy.vy;

          // Bounce off edges
          if (enemy.x < 0 || enemy.x > app.screen.width - enemy.width) {
            enemy.vx *= -1;
          }
          if (enemy.y < 0 || enemy.y > app.screen.height - enemy.height - 100) {
            enemy.vy *= -1;
          }

          // Evasion from bullet path
          const bulletLineX = player.x + player.width / 2;
          const dx = enemy.x + enemy.width / 2 - bulletLineX;
          const avoidRange = 100;

          if (Math.abs(dx) < avoidRange) {
            if (enemy.dodgeCooldown <= 0) {
              const force = (avoidRange - Math.abs(dx)) / avoidRange;
              const basePush = 2.5 * force * enemy.evadeFactor;

              // Add tiny randomness so they don't all pick the exact same direction
              const direction = dx + (Math.random() - 0.5) * 10;
              enemy.vx += direction > 0 ? basePush : -basePush;
              enemy.vy *= -1;

               // Add delay before next dodge
              enemy.dodgeCooldown = 10 + Math.random() * 10; // delay in frames (~0.3s)
            }
          }

          // Decrease cooldown over time
          if (enemy.dodgeCooldown > 0) {
            enemy.dodgeCooldown--;
          }

          // Apply some damping (friction) to keep them from speeding up forever
          if (enemy.vx > 2) {
            enemy.vx *= 0.99;
          }
        });

        // Clamp player inside screen
        player.x = Math.max(0, Math.min(app.screen.width - playerWidth, player.x));

        // Move bullets
        bullets.forEach((bullet, index) => {
          bullet.y -= 10;
          // Remove if off screen
          if (bullet.y < 0) {
            app.stage.removeChild(bullet);
            bullets.splice(index, 1);
          }
        });

        // Check for collisions
        bullets.forEach((bullet, bulletIndex) => {
          enemies.forEach((enemy, enemyIndex) => {
            const hit =
              bullet.x < enemy.x + enemy.width &&
              bullet.x + 4 > enemy.x &&
              bullet.y < enemy.y + enemy.height &&
              bullet.y + 10 > enemy.y;

            if (hit) {
              app.stage.removeChild(enemy);
              app.stage.removeChild(bullet);
              enemies.splice(enemyIndex, 1);
              bullets.splice(bulletIndex, 1);
            }
          });
        });
      });
      return () => app.destroy(true);
    };

    setupPixi();
  }, []);

  return <div ref={gameRef} style={{ width: '100vw', height: '100vh' }} />;
}
