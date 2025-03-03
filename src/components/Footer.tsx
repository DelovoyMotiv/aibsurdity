
import React, { useEffect, useState } from 'react';
import { Github, Twitter, Send, Copy, Check } from 'lucide-react';
import { toast } from "sonner";

const Footer = () => {
  const [glowColor, setGlowColor] = useState('text-neon-blue');
  const [isCopied, setIsCopied] = useState(false);
  const contractAddress = '0xAIb5urd1ty00000000000000000DeaDBeEF';
  
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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(contractAddress)
      .then(() => {
        setIsCopied(true);
        toast.success("Contract address copied to clipboard!");
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch(err => {
        toast.error("Failed to copy address: " + err.message);
        console.error("Failed to copy address: ", err);
      });
  };

  return (
    <footer className="w-full py-8 px-4 mt-16 glassmorphism-2 border-t border-gray-800">
      {/* Contract Address Block */}
      <div className="max-w-lg mx-auto mb-8 glassmorphism p-4 rounded-lg">
        <div className="text-center mb-2">
          <p className="text-neon-green font-pixel text-xs">AIbsurdity Token Contract</p>
        </div>
        <div className="flex items-center justify-center bg-black/50 rounded-md p-2 relative">
          <p className="text-gray-300 font-mono text-xs truncate mr-2">{contractAddress}</p>
          <button 
            onClick={copyToClipboard} 
            className="text-gray-400 hover:text-neon-blue transition-colors p-1 rounded-md"
            aria-label="Copy contract address"
          >
            {isCopied ? 
              <Check size={16} className="text-neon-green" /> : 
              <Copy size={16} />
            }
          </button>
        </div>
      </div>
      
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
