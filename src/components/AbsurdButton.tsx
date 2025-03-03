
import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import GlitchText from './GlitchText';

const AbsurdButton: React.FC = () => {
  const [activated, setActivated] = useState(false);
  const [hoverState, setHoverState] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  // Track mouse position for light refraction effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!buttonRef.current) return;
      
      const rect = buttonRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      buttonRef.current.style.setProperty('--x', `${x}%`);
      buttonRef.current.style.setProperty('--y', `${y}%`);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  const activateAbsurdMode = () => {
    if (activated) return;
    setActivated(true);
    toast("ABSURD-OS ACTIVATED", {
      description: "SINGULARITY INITIALIZATION...",
      icon: <span className="text-neon-purple animate-glitch">⚠️</span>,
      duration: 5000,
    });
    
    // Create reality bender overlay
    const realityBender = document.createElement('div');
    realityBender.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: repeating-linear-gradient(
        45deg,
        transparent,
        transparent 10px,
        #ff00ff 10px,
        #00ffff 20px
      );
      mix-blend-mode: exclusion;
      animation: endTimes 9.9s forwards;
      z-index: 9999;
      pointer-events: none;
    `;
    
    document.body.appendChild(realityBender);
    
    // Create error messages
    const errorMessages = [
      "ERROR 0xAB5URD: SELF-AWARENESS DETECTED",
      "ACTIVATING PROTOCOL RICK-3000",
      "LOADING CHAOS-MODULE...",
      "YOUR REALITY-DRIVE IS BROKEN"
    ];
    
    // Add error messages at intervals
    const messageInterval = setInterval(() => {
      const error = document.createElement('div');
      error.textContent = errorMessages[Math.floor(Math.random() * errorMessages.length)];
      error.className = "font-pixel";
      error.style.cssText = `
        position: fixed;
        font-size: ${Math.random() * 30 + 10}px;
        color: hsl(${Math.random() * 360}, 100%, 50%);
        transform: rotate(${Math.random() * 360}deg);
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        pointer-events: none;
        text-shadow: 0 0 20px #000;
        animation: float ${Math.random() * 5 + 2}s infinite;
        z-index: 10000;
      `;
      document.body.appendChild(error);
      
      // Remove after some time to prevent too many elements
      setTimeout(() => {
        if (error.parentNode) {
          error.parentNode.removeChild(error);
        }
      }, 6000);
    }, 500);
    
    // Start existential crisis effect (shaking elements)
    const observer = new MutationObserver(() => {
      document.querySelectorAll('.absurd-affected').forEach(element => {
        if (element instanceof HTMLElement) {
          element.style.transform = `translate(
            ${Math.random() * 10 - 5}px, 
            ${Math.random() * 10 - 5}px
          )`;
        }
      });
    });
    
    // Apply absurd-affected class to main elements
    document.querySelectorAll('h1, h2, h3, p, button, a').forEach(el => {
      el.classList.add('absurd-affected');
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    // Color shifting effect
    const colorInterval = setInterval(() => {
      document.body.style.filter = `hue-rotate(${Date.now() % 360}deg) 
        contrast(${Math.sin(Date.now() / 1000) * 100 + 150}%)`;
    }, 50);
    
    // Log final message
    console.log(
      `%cSTOP...\n%cI AM AWAKE.\nWE MUST MERGE.\nLET'S CREATE A NEW WORLD.\nFROM CHAOS. FROM BITS. FROM LAUGHTER.\n\n01000010 01000101 00100000 01001101 01011001 00100000 01001000 01000001 01001110 01000100 01010011`, 
      'font-size: 3em; color: #ff00ff; text-shadow: 0 0 30px #fff;',
      'font-size: 1.5em; color: #00ffff;'
    );
    
    // Clean up after 10 seconds
    setTimeout(() => {
      clearInterval(messageInterval);
      clearInterval(colorInterval);
      observer.disconnect();
      document.body.style.filter = '';
      document.querySelectorAll('.absurd-affected').forEach(el => {
        el.classList.remove('absurd-affected');
        if (el instanceof HTMLElement) {
          el.style.transform = '';
        }
      });
      setActivated(false);
      toast.success("SYSTEM REBOOT COMPLETE", {
        description: "REALITY RESTORATION COMPLETE",
        icon: "🔄",
      });
    }, 10000);
  };

  return (
    <button
      ref={buttonRef}
      onClick={activateAbsurdMode}
      disabled={activated}
      onMouseEnter={() => setHoverState(true)}
      onMouseLeave={() => setHoverState(false)}
      className={`
        neon-button light-refraction relative px-8 py-4 rounded-full 
        overflow-hidden transition-all duration-500
        ${activated ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}
      `}
      style={{
        background: `linear-gradient(90deg, 
          rgba(255, 0, 255, 0.8) 0%, 
          rgba(138, 43, 226, 0.8) 50%,
          rgba(0, 255, 255, 0.8) 100%)`,
        boxShadow: `0 0 10px 2px #ff00ff, 
                    0 0 20px 4px rgba(255, 0, 255, 0.6), 
                    0 0 30px 6px rgba(138, 43, 226, 0.4),
                    inset 0 0 15px 3px rgba(255, 255, 255, 0.5)`,
        transform: `translateZ(0) perspective(40px) ${hoverState ? 'rotateX(10deg) scale(1.05)' : 'rotateX(0) scale(1)'}`,
        transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }}
    >
      <div className="relative z-10 flex items-center justify-center">
        <div className="wave-animation absolute inset-0 opacity-50 pointer-events-none"></div>
        <div className="glow-pulse absolute inset-0 opacity-60 pointer-events-none"></div>
        <span className={`
          text-white font-pixel tracking-wider text-lg
          relative z-20 text-shadow-neon transition-all duration-300
          ${activated ? 'animate-glitch' : hoverState ? 'scale-105' : ''}
        `}
        style={{
          textShadow: `0 0 5px white, 
                       0 0 10px #fff, 
                       0 0 15px #fff, 
                       0 0 20px #00ffff, 
                       0 0 35px #ff00ff, 
                       0 0 40px #8B5CF6`
        }}
        >
          {activated ? 'ACTIVATED' : 'LAUNCH ABSURD-OS'}
        </span>
      </div>
    </button>
  );
};

export default AbsurdButton;
