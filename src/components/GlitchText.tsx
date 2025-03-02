
import React, { useState, useEffect } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  fontSize?: string;
  color?: string;
  variant?: 'default' | 'intense' | 'subtle';
  as?: React.ElementType;
}

const GlitchText: React.FC<GlitchTextProps> = ({
  text,
  className = '',
  fontSize = 'text-xl',
  color = 'text-white',
  variant = 'default',
  as: Component = 'div'
}) => {
  const [isGlitching, setIsGlitching] = useState(false);
  
  // Random glitch effect
  useEffect(() => {
    const glitchRandomly = () => {
      if (Math.random() > 0.7) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 200 + Math.random() * 500);
      }
      
      const nextGlitch = 1000 + Math.random() * 5000;
      setTimeout(glitchRandomly, nextGlitch);
    };
    
    const initialDelay = Math.random() * 2000;
    const timeoutId = setTimeout(glitchRandomly, initialDelay);
    
    return () => clearTimeout(timeoutId);
  }, []);
  
  const variantClasses = {
    default: 'animate-glitch',
    intense: 'animate-glitch [animation-iteration-count:infinite]',
    subtle: 'hover:animate-glitch'
  };
  
  return (
    <Component 
      className={`glitch-container ${fontSize} ${color} ${className} ${isGlitching ? variantClasses[variant] : ''}`}
      data-text={text}
    >
      {text}
    </Component>
  );
};

export default GlitchText;
