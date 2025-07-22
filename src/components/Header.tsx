import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="flex items-center justify-between bg-gray-800 text-white p-4">
            <h1 className="text-2xl">Hello, I'm Teo!</h1>
            <nav>
                <ul className="flex space-x-4">
                    <li><a href="#about" className="hover:underline">About Me</a></li>
                    <li><a href="#projects" className="hover:underline">Projects</a></li>
                    <li><a href="#contact" className="hover:underline">Contact</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;