// HeroSection.tsx
import HeroInvadersCanvas from './HeroInvadersCanvas';

const HeroSection: React.FC = () => {
  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      <HeroInvadersCanvas />
      <div style={{
        position: 'relative',
        zIndex: 1,
        color: 'white',
        textAlign: 'center',
        paddingTop: '30vh',
        fontSize: '2rem'
      }}>
        <h1>Welcome to My World</h1>
        <p>Play while you read about me</p>
      </div>
    </div>
  );
};

export default HeroSection;