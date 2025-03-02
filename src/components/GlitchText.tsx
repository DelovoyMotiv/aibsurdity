
import React, { useState, useEffect } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  fontSize?: string;
  color?: string;
  variant?: 'default' | 'intense' | 'subtle' | 'pixel';
  as?: React.ElementType;
  pixelated?: boolean;
}

const GlitchText: React.FC<GlitchTextProps> = ({
  text,
  className = '',
  fontSize = 'text-xl',
  color = 'text-white',
  variant = 'default',
  as: Component = 'div',
  pixelated = false
}) => {
  const [isGlitching, setIsGlitching] = useState(false);
  const [textDisplay, setTextDisplay] = useState(text);
  
  // Random glitch effect
  useEffect(() => {
    const glitchRandomly = () => {
      if (Math.random() > 0.7) {
        setIsGlitching(true);
        
        // For pixel variant, randomly change some characters
        if (variant === 'pixel') {
          const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/\\';
          const textArray = text.split('');
          const numGlitches = Math.floor(Math.random() * 3) + 1;
          
          for (let i = 0; i < numGlitches; i++) {
            const pos = Math.floor(Math.random() * text.length);
            textArray[pos] = glitchChars[Math.floor(Math.random() * glitchChars.length)];
          }
          
          setTextDisplay(textArray.join(''));
          
          // Reset text after glitch
          setTimeout(() => {
            setTextDisplay(text);
          }, 150);
        }
        
        setTimeout(() => setIsGlitching(false), 200 + Math.random() * 500);
      }
      
      const nextGlitch = 1000 + Math.random() * 5000;
      setTimeout(glitchRandomly, nextGlitch);
    };
    
    const initialDelay = Math.random() * 2000;
    const timeoutId = setTimeout(glitchRandomly, initialDelay);
    
    return () => clearTimeout(timeoutId);
  }, [text, variant]);
  
  const variantClasses = {
    default: 'animate-glitch',
    intense: 'animate-glitch [animation-iteration-count:infinite]',
    subtle: 'hover:animate-glitch',
    pixel: 'animate-glitch font-mono tracking-widest'
  };
  
  const pixelatedClass = pixelated ? 'font-pixel tracking-wide' : '';
  
  return (
    <Component 
      className={`glitch-container ${fontSize} ${color} ${className} ${isGlitching ? variantClasses[variant] : ''} ${pixelatedClass}`}
      data-text={textDisplay}
      style={{ 
        ...(pixelated && { fontFamily: '"Press Start 2P", monospace', letterSpacing: '0.1em' }),
        textShadow: isGlitching ? '2px 2px 0 #ff00ff, -2px -2px 0 #00ffff' : 'none'
      }}
    >
      {textDisplay}
    </Component>
  );
};

export default GlitchText;
