
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
  const glitchAnimationClass = isGlitching ? 
    `animate-broken-glitch` : 
    '';
  
  return (
    <div className={`holographic-card terminal-card rounded-lg p-6 my-6 max-w-3xl mx-auto ${className}`}
         style={{ 
           backgroundColor: 'rgba(10, 10, 15, 0.85)', 
           borderColor: 'rgba(0, 255, 255, 0.2)',
           boxShadow: '0 0 15px rgba(0, 255, 255, 0.15), inset 0 0 10px rgba(0, 0, 0, 0.8)'
         }}>
      <div className="terminal-header flex items-center mb-3 border-b border-opacity-20 border-neon-blue pb-2">
        <div className="w-3 h-3 rounded-full bg-neon-red opacity-70 mr-2"></div>
        <div className="w-3 h-3 rounded-full bg-neon-yellow opacity-70 mr-2"></div>
        <div className="w-3 h-3 rounded-full bg-neon-green opacity-70 mr-2"></div>
        <span className="text-xs text-gray-400 font-mono ml-2">absurdity.terminal</span>
      </div>
      <p className={`text-8bit-glow text-center font-pixel neon-text-subtle ${glitchAnimationClass}`}
         style={{ 
           color: '#e0e0ff', 
           textShadow: '0 0 8px rgba(0, 255, 255, 0.6), 0 0 12px rgba(255, 0, 255, 0.3)', 
           letterSpacing: '0.05em'
         }}>
        {isTyping ? displayText + (Math.random() > 0.5 ? '_' : '|') : displayText}
      </p>
      <div className="terminal-scanline"></div>
    </div>
  );
};

export default AbsurdQuoteBlock;
