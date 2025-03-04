
import React, { useState, useEffect, useRef } from 'react';

interface AbsurdQuoteBlockProps {
  text: string;
  className?: string;
  typingSpeed?: number;
  glitchIntensity?: 'low' | 'medium' | 'high';
}

const AbsurdQuoteBlock: React.FC<AbsurdQuoteBlockProps> = ({ 
  text, 
  className = "", 
  typingSpeed = 80,
  glitchIntensity = 'medium'
}) => {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [isGlitching, setIsGlitching] = useState(false);
  const typeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const glitchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Terminal typing effect
  useEffect(() => {
    if (isTyping) {
      let currentIndex = 0;
      
      const typeNextChar = () => {
        if (currentIndex <= text.length) {
          setDisplayText(text.substring(0, currentIndex));
          currentIndex++;
          typeTimeoutRef.current = setTimeout(typeNextChar, typingSpeed);
        } else {
          setIsTyping(false);
          // Start glitching after typing completes
          triggerRandomGlitches();
        }
      };
      
      typeNextChar();
    }
    
    return () => {
      if (typeTimeoutRef.current) {
        clearTimeout(typeTimeoutRef.current);
      }
      if (glitchTimeoutRef.current) {
        clearTimeout(glitchTimeoutRef.current);
      }
    };
  }, [isTyping, text, typingSpeed]);
  
  // Glitch effect function
  const triggerRandomGlitches = () => {
    const glitchFrequency = glitchIntensity === 'high' ? 2000 : 
                           glitchIntensity === 'medium' ? 4000 : 6000;
    
    const scheduleNextGlitch = () => {
      const nextGlitchDelay = Math.random() * glitchFrequency + 1000;
      
      glitchTimeoutRef.current = setTimeout(() => {
        setIsGlitching(true);
        
        // Create a glitched version of the text
        const glitchText = createGlitchedText(text);
        setDisplayText(glitchText);
        
        // Reset after a short period
        setTimeout(() => {
          setIsGlitching(false);
          setDisplayText(text);
          scheduleNextGlitch();
        }, 150);
      }, nextGlitchDelay);
    };
    
    scheduleNextGlitch();
  };
  
  // Helper to create glitched text
  const createGlitchedText = (originalText: string) => {
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,./<>?\\';
    const textArray = originalText.split('');
    
    // Number of characters to glitch based on intensity
    const glitchCount = glitchIntensity === 'high' ? 5 : 
                        glitchIntensity === 'medium' ? 3 : 1;
    
    for (let i = 0; i < glitchCount; i++) {
      const randomIndex = Math.floor(Math.random() * textArray.length);
      textArray[randomIndex] = glitchChars[Math.floor(Math.random() * glitchChars.length)];
    }
    
    return textArray.join('');
  };
  
  // Generate unique glitch animation classes based on component instance
  const glitchAnimationClass = isGlitching ? `animate-broken-glitch` : '';
  
  return (
    <div className={`py-4 my-2 mx-auto ${className}`}>
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/5 via-neon-purple/5 to-neon-green/5 rounded-lg blur-md"></div>
        <div className="relative">
          <p className={`text-center font-pixel text-xl md:text-2xl ${glitchAnimationClass}`}
             style={{ 
               color: 'white', 
               textShadow: '0 0 8px rgba(156, 211, 239, 0.7), 0 0 12px rgba(107, 33, 168, 0.3)', 
               letterSpacing: '0.05em',
               lineHeight: '1.8'
             }}>
            {isTyping ? displayText + (Math.random() > 0.5 ? '_' : '|') : displayText}
          </p>
          <div className="h-0.5 w-0 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-blue animate-[width_3s_ease-in-out_forwards] mt-3 mx-auto" style={{ width: isTyping ? '0%' : '60%' }}></div>
        </div>
      </div>
    </div>
  );
};

export default AbsurdQuoteBlock;
