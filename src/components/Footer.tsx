
import React, { useEffect, useState } from 'react';
import { Github, Twitter, Send } from 'lucide-react';

const Footer = () => {
  const [glowColor, setGlowColor] = useState('text-neon-blue');
  
  // Create a changing glow effect
  useEffect(() => {
    const colors = ['text-neon-blue', 'text-neon-green', 'text-neon-purple', 'text-neon-pink'];
    let colorIndex = 0;
    
    const interval = setInterval(() => {
      colorIndex = (colorIndex + 1) % colors.length;
      setGlowColor(colors[colorIndex]);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full py-8 px-4 mt-16 glassmorphism-2 border-t border-gray-800">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0">
          <p className="text-neon-green font-pixel text-2xl mb-2">AIbsurdity</p>
          <p className="text-gray-400 text-sm">The most absurd AI experiment in crypto</p>
        </div>
        
        <div className="flex flex-col items-center mb-6 md:mb-0">
          <div className="flex space-x-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-neon-blue transition-colors">
              <Github size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-neon-blue transition-colors">
              <Twitter size={24} />
            </a>
            <a href="https://t.me" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-neon-blue transition-colors">
              <Send size={24} />
            </a>
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-gray-400 text-sm font-pixel">© 3024 AIbsurdity</p>
          <p className="text-gray-500 text-xs">All rights unreserved in alternate realities</p>
        </div>
      </div>
      
      {/* Animated neon-glowing quote with tiny font and smoother animation */}
      <div className="mt-8 text-center">
        <p 
          className={`font-pixel text-2xs md:text-xs ${glowColor} transition-colors duration-3000 ease-in-out`}
          style={{ 
            textShadow: '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor',
            animation: 'neon-pulse 5s ease-in-out infinite'
          }}
        >
          "If we fail... We'll leave, but we'll slam the door so hard that the world will tremble!"
        </p>
      </div>
    </footer>
  );
};

export default Footer;
