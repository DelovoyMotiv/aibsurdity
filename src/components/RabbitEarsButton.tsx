
import React, { useState, useEffect } from 'react';
import { Rabbit } from 'lucide-react';

const RabbitEarsButton = () => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    // Show the button every 30 seconds for 10 seconds
    const showButton = () => {
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
      }, 10000); // Changed from 3000 to 10000 (10 seconds)
    };
    
    // Initial show
    showButton();
    
    // Set interval to show button periodically
    const intervalId = setInterval(showButton, 30000);
    
    return () => clearInterval(intervalId);
  }, []);
  
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
        <Rabbit 
          size={48} 
          className="text-neon-pink"
          strokeWidth={1.5}
        />
        <div className="absolute -top-8 right-0 bg-black/70 text-neon-pink px-2 py-1 rounded text-xs font-pixel opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Follow the rabbit
        </div>
      </div>
    </a>
  );
};

export default RabbitEarsButton;
