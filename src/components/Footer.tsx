
import React from 'react';
import { Github, Twitter, Send } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full py-8 px-4 mt-16 glassmorphism-2 border-t border-gray-800">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0">
          <p className="text-neon-green font-pixel text-2xl mb-2">AIbsurdity</p>
          <p className="text-gray-400 text-sm">The most absurd AI experiment in crypto</p>
        </div>
        
        <div className="flex flex-col items-center mb-6 md:mb-0">
          <p className="text-gray-300 mb-2 font-pixel">Join the absurdity</p>
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
          <p className="text-gray-400 text-sm font-pixel">© 2024 AIbsurdity</p>
          <p className="text-gray-500 text-xs">All rights unreserved in alternate realities</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
