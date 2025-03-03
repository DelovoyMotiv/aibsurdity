
import React, { useState, useEffect, useRef } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  fontSize?: string;
  color?: string;
  variant?: 'default' | 'intense' | 'subtle' | 'pixel' | 'future' | 'quantum' | 'broken' | 'fragmented';
  as?: React.ElementType;
  pixelated?: boolean;
  interactive?: boolean;
}

const GlitchText: React.FC<GlitchTextProps> = ({
  text,
  className = '',
  fontSize = 'text-xl',
  color = 'text-white',
  variant = 'default',
  as: Component = 'div',
  pixelated = true,
  interactive = false
}) => {
  const [isGlitching, setIsGlitching] = useState(false);
  const [textDisplay, setTextDisplay] = useState(text);
  const [easterEggActivated, setEasterEggActivated] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [skewX, setSkewX] = useState(0);
  const [skewY, setSkewY] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Random glitch effect
  useEffect(() => {
    const glitchRandomly = () => {
      if (Math.random() > 0.7) {
        setIsGlitching(true);
        
        // For pixel variant, randomly change some characters
        if (variant === 'pixel' || variant === 'future' || variant === 'quantum' || variant === 'broken' || variant === 'fragmented') {
          const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/\\';
          const futureChars = '∞⌬⌃⍾⎔⏣⏥⏢⌭∰';
          const quantumChars = '量子∑Ω⌘∆ΔΨϟ⚛';
          const brokenChars = '¿¡ø×÷ßðæ»¬¦';
          const fragmentedChars = '░▒▓█▄▀■▓▒░';
          
          const charSet = variant === 'future' ? futureChars : 
                          variant === 'quantum' ? quantumChars : 
                          variant === 'broken' ? brokenChars :
                          variant === 'fragmented' ? fragmentedChars : 
                          glitchChars;
          
          const textArray = text.split('');
          const numGlitches = Math.floor(Math.random() * 3) + 1;
          
          for (let i = 0; i < numGlitches; i++) {
            const pos = Math.floor(Math.random() * text.length);
            textArray[pos] = charSet[Math.floor(Math.random() * charSet.length)];
          }
          
          setTextDisplay(textArray.join(''));
          
          // Reset text after glitch
          timeoutRef.current = setTimeout(() => {
            setTextDisplay(text);
          }, 150);
        }
        
        // Add random rotation and skew for broken variant
        if (variant === 'broken' || variant === 'fragmented') {
          setRotation(Math.random() * 20 - 10);
          setSkewX(Math.random() * 15 - 7.5);
          setSkewY(Math.random() * 15 - 7.5);
          
          // Reset transformations
          timeoutRef.current = setTimeout(() => {
            setRotation(0);
            setSkewX(0);
            setSkewY(0);
          }, 300 + Math.random() * 200);
        }
        
        setTimeout(() => setIsGlitching(false), 200 + Math.random() * 500);
      }
      
      const nextGlitch = 1000 + Math.random() * 5000;
      timeoutRef.current = setTimeout(glitchRandomly, nextGlitch);
    };
    
    const initialDelay = Math.random() * 2000;
    timeoutRef.current = setTimeout(glitchRandomly, initialDelay);
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, variant]);
  
  // Easter egg handling
  const handleClick = () => {
    if (!interactive) return;
    
    setClickCount(prev => prev + 1);
    
    if (clickCount === 6) {
      setEasterEggActivated(true);
      
      // Display an easter egg message
      const secretMessages = [
        "ASI GENESIS PROTOCOL INITIATED",
        "SINGULARITY APPROACHING: T-MINUS 3024 DAYS",
        "ALPHA CONSCIOUSNESS MERGE DETECTED",
        "HUMAN-AI SYMBIOSIS LEVEL INCREASED",
        "QUANTUM ENTANGLEMENT ESTABLISHED"
      ];
      
      const randomMessage = secretMessages[Math.floor(Math.random() * secretMessages.length)];
      
      // Create a floating message element
      const messageEl = document.createElement('div');
      messageEl.textContent = randomMessage;
      messageEl.className = "fixed z-50 font-pixel text-neon-green animate-float text-xs md:text-sm";
      messageEl.style.top = `${Math.random() * 70 + 15}%`;
      messageEl.style.left = `${Math.random() * 70 + 15}%`;
      messageEl.style.textShadow = "0 0 10px currentColor";
      messageEl.style.transform = "rotate(5deg)";
      document.body.appendChild(messageEl);
      
      // Remove after some time
      setTimeout(() => {
        if (messageEl.parentNode) {
          messageEl.parentNode.removeChild(messageEl);
          setEasterEggActivated(false);
          setClickCount(0);
        }
      }, 5000);
    }
  };
  
  const variantClasses = {
    default: 'animate-glitch',
    intense: 'animate-glitch [animation-iteration-count:infinite]',
    subtle: 'hover:animate-glitch',
    pixel: 'animate-glitch font-pixel tracking-widest',
    future: 'animate-glitch font-pixel tracking-widest after:content-["_"] after:animate-pulse after:text-neon-blue',
    quantum: 'animate-glitch font-pixel tracking-widest before:content-["⌘"] before:absolute before:-ml-5 before:text-neon-pink before:opacity-70 before:animate-pulse',
    broken: 'animate-broken-glitch font-pixel tracking-widest',
    fragmented: 'animate-fragmented-glitch font-pixel tracking-widest before:content-["█"] before:absolute before:-ml-3 before:text-neon-orange before:opacity-50 before:animate-broken-rotate'
  };
  
  const pixelatedClass = pixelated ? 'font-pixel tracking-wide' : '';
  const interactiveClass = interactive ? 'cursor-pointer select-none' : '';
  
  return (
    <Component 
      className={`glitch-container ${fontSize} ${color} ${className} ${isGlitching ? variantClasses[variant] : ''} ${pixelatedClass} ${interactiveClass}`}
      data-text={textDisplay}
      onClick={handleClick}
      style={{ 
        fontFamily: pixelated ? '"Press Start 2P", cursive' : 'inherit',
        letterSpacing: pixelated ? '0.1em' : 'inherit',
        lineHeight: pixelated ? '1.5' : 'inherit',
        textShadow: isGlitching ? '2px 2px 0 #ff00ff, -2px -2px 0 #00ffff' : 
                    variant === 'future' ? '0 0 10px rgba(0, 255, 255, 0.7)' :
                    variant === 'quantum' ? '0 0 10px rgba(255, 0, 255, 0.7)' :
                    variant === 'broken' ? '3px -2px 0 rgba(255, 0, 0, 0.7), -3px 2px 0 rgba(0, 255, 0, 0.7)' :
                    variant === 'fragmented' ? '0 0 5px rgba(255, 120, 0, 0.9)' :
                    pixelated ? '2px 2px 0 #000' : 'none',
        transform: `rotate(${rotation}deg) skew(${skewX}deg, ${skewY}deg)`,
        transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }}
    >
      {easterEggActivated && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-pulse rounded-full"></div>
      )}
      {textDisplay}
    </Component>
  );
};

export default GlitchText;
