
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PixelArt from './PixelArt';

const RabbitEarsButton = () => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    // Show the button every 30 seconds for 3 seconds
    const showButton = () => {
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
      }, 3000);
    };
    
    // Initial show
    showButton();
    
    // Set interval to show button periodically
    const intervalId = setInterval(showButton, 30000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  // Custom pixel art rabbit ears
  const RabbitEars = () => (
    <div className="w-12 h-16 grid grid-cols-3 gap-0.5 pixel-rendering">
      {/* Left ear */}
      {Array(15).fill(0).map((_, i) => (
        <div 
          key={`left-${i}`} 
          className={`${
            [1, 2, 4, 5, 7, 8, 10, 11, 13, 14].includes(i) 
              ? 'bg-neon-pink' 
              : 'bg-transparent'
          } ${[1, 2, 4, 5, 7, 8, 10, 11, 13, 14].includes(i) ? 'shadow-sm' : ''}`}
          style={{
            boxShadow: [1, 2, 4, 5, 7, 8, 10, 11, 13, 14].includes(i) ? '0px 0px 2px rgba(0,0,0,0.5)' : 'none',
            width: '100%',
            height: '100%'
          }}
        />
      ))}
      
      {/* Middle space */}
      {Array(15).fill(0).map((_, i) => (
        <div 
          key={`middle-${i}`} 
          className="bg-transparent"
        />
      ))}
      
      {/* Right ear */}
      {Array(15).fill(0).map((_, i) => (
        <div 
          key={`right-${i}`} 
          className={`${
            [0, 3, 6, 9, 12].includes(i) 
              ? 'bg-transparent' 
              : 'bg-neon-pink'
          } ${![0, 3, 6, 9, 12].includes(i) ? 'shadow-sm' : ''}`}
          style={{
            boxShadow: ![0, 3, 6, 9, 12].includes(i) ? '0px 0px 2px rgba(0,0,0,0.5)' : 'none',
            width: '100%',
            height: '100%'
          }}
        />
      ))}
    </div>
  );
  
  if (!visible) return null;
  
  return (
    <a
      href="/rabbit-hole"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 cursor-pointer transform transition-transform hover:scale-110 animate-fade-in"
      aria-label="Follow the rabbit"
    >
      <div className="relative group">
        <RabbitEars />
        <div className="absolute -top-8 right-0 bg-black/70 text-neon-pink px-2 py-1 rounded text-xs font-pixel opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Follow the rabbit
        </div>
      </div>
    </a>
  );
};

export default RabbitEarsButton;
