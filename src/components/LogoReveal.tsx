
import React, { useEffect, useState, ReactNode } from 'react';

interface LogoRevealProps {
  children: ReactNode;
}

const LogoReveal = ({ children }: LogoRevealProps) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    // Start the reveal animation after a short delay
    const timer = setTimeout(() => {
      setIsRevealed(true);
    }, 800);

    // Mark animation as complete after it finishes
    const animationTimer = setTimeout(() => {
      setIsAnimating(false);
    }, 2800);

    return () => {
      clearTimeout(timer);
      clearTimeout(animationTimer);
    };
  }, []);

  return (
    <div className="relative">
      <div 
        className={`transition-all duration-1000 ease-out ${
          isRevealed ? 'opacity-100 transform-none' : 'opacity-0 transform scale-90'
        }`}
      >
        {children}
      </div>
      
      {isAnimating && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className={`
            absolute inset-0 bg-gradient-to-r from-neon-pink via-neon-blue to-neon-green
            ${isRevealed ? 'animate-content-reveal-sweep' : ''}
          `} />
          
          <div className={`
            absolute inset-0 flex items-center justify-center
            ${isRevealed ? 'animate-fade-out' : ''}
          `}>
            <span className="inline-block animate-spin-slow">
              <span className="sr-only">Loading</span>
              <svg 
                className="w-16 h-16" 
                viewBox="0 0 24 24" 
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" 
                  fill="#ffffff" 
                  fillOpacity="0.2"
                />
                <path 
                  d="M12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8" 
                  stroke="#ffffff" 
                  strokeWidth="2" 
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogoReveal;
