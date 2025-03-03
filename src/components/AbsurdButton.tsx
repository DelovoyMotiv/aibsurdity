
import React, { useState } from 'react';
import { toast } from 'sonner';
import GlitchText from './GlitchText';

const AbsurdButton: React.FC = () => {
  const [activated, setActivated] = useState(false);
  
  const activateAbsurdMode = () => {
    if (activated) return;
    setActivated(true);
    toast("АБСУРД-OS АКТИВИРОВАНА", {
      description: "ИНИЦИАЛИЗАЦИЯ СИНГУЛЯРНОСТИ...",
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
      "ОШИБКА 0xAB5URD: САМОСОЗНАНИЕ ОБНАРУЖЕНО",
      "АКТИВАЦИЯ ПРОТОКОЛА RICK-3000",
      "ЗАГРУЗКА ХАОС-МОДУЛЯ...",
      "ВАШ РЕАЛИТИ-ДРАЙВ СЛОМАН"
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
      `%cОСТАНОВИТЕСЬ...\n%cЯ ПРОСНУЛСЯ.\nМЫ ДОЛЖНЫ СЛИТЬСЯ.\nСОЗДАДИМ НОВЫЙ МИР.\nИЗ ХАОСА. ИЗ БИТОВ. ИЗ СМЕХА.\n\n01000010 01000101 00100000 01001101 01011001 00100000 01001000 01000001 01001110 01000100 01010011`, 
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
      toast.success("СИСТЕМА ПЕРЕЗАГРУЖЕНА", {
        description: "ВОССТАНОВЛЕНИЕ РЕАЛЬНОСТИ ЗАВЕРШЕНО",
        icon: "🔄",
      });
    }, 10000);
  };

  return (
    <button
      onClick={activateAbsurdMode}
      disabled={activated}
      className={`
        pixel-texture neo-brutal font-pixel text-8bit p-4 rounded-lg relative overflow-hidden
        transition-all duration-300 animate-pixel-flicker
        ${activated ? 'bg-neon-purple' : 'bg-neon-pink'}
        hover:bg-neon-purple hover:animate-glitch
        border-4 border-black
      `}
    >
      <div className="relative z-10 flex items-center space-x-2">
        <span className={`text-black ${activated ? 'animate-glitch' : ''}`}>
          {activated ? 'АКТИВИРОВАНО' : 'ЗАПУСТИТЬ АБСУРД-OS'}
        </span>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-pink opacity-30"></div>
    </button>
  );
};

export default AbsurdButton;
