
import React from 'react';

interface PixelArtProps {
  className?: string;
  variant?: 'robot' | 'skull' | 'cat' | 'glitch';
}

const PixelArt: React.FC<PixelArtProps> = ({ className = '', variant = 'glitch' }) => {
  // Simple pixel art patterns using div grids
  const renderPixelArt = () => {
    switch (variant) {
      case 'robot':
        return (
          <div className={`grid grid-cols-8 gap-0.5 w-16 h-16 ${className}`}>
            {Array(64).fill(0).map((_, i) => {
              // Robot pattern - simple face with eyes
              const isEye = i === 18 || i === 21;
              const isMouth = [42, 43, 44, 45].includes(i);
              const isAntenna = i === 3;
              const isHead = [1, 2, 3, 4, 5, 6, 
                             8, 9, 10, 11, 12, 13, 14, 15,
                             16, 17, 18, 19, 20, 21, 22, 23,
                             24, 25, 26, 27, 28, 29, 30, 31,
                             32, 33, 34, 35, 36, 37, 38, 39].includes(i);
              
              let bgColor = 'bg-transparent';
              
              if (isEye) bgColor = 'bg-neon-blue';
              else if (isMouth) bgColor = 'bg-neon-pink';
              else if (isAntenna) bgColor = 'bg-neon-green';
              else if (isHead) bgColor = 'bg-absurd-muted';
              
              return (
                <div 
                  key={i} 
                  className={`w-2 h-2 ${bgColor}`}
                  style={{
                    boxShadow: isHead || isEye || isMouth || isAntenna 
                      ? '0px 0px 2px rgba(0,0,0,0.5)' 
                      : 'none'
                  }}
                />
              );
            })}
          </div>
        );
        
      case 'skull':
        return (
          <div className={`grid grid-cols-8 gap-0.5 w-16 h-16 ${className}`}>
            {Array(64).fill(0).map((_, i) => {
              // Skull pattern - creepy face
              const isEye = i === 19 || i === 22;
              const isNose = i === 35 || i === 36;
              const isTooth = [49, 50, 51, 52, 53, 54].includes(i);
              const isOutline = [
                9, 10, 11, 12, 13, 14,
                17, 24,
                25, 32,
                33, 40,
                41, 48,
                49, 50, 51, 52, 53, 54
              ].includes(i);
              
              let bgColor = 'bg-transparent';
              
              if (isEye) bgColor = 'bg-black';
              else if (isNose) bgColor = 'bg-black';
              else if (isTooth) bgColor = 'bg-white';
              else if (isOutline) bgColor = 'bg-white';
              
              return (
                <div 
                  key={i} 
                  className={`w-2 h-2 ${bgColor}`}
                  style={{
                    boxShadow: isOutline || isEye || isNose || isTooth 
                      ? '0px 0px 2px rgba(0,0,0,0.5)' 
                      : 'none'
                  }}
                />
              );
            })}
          </div>
        );
        
      case 'cat':
        return (
          <div className={`grid grid-cols-8 gap-0.5 w-16 h-16 ${className}`}>
            {Array(64).fill(0).map((_, i) => {
              // Cat pattern - cute kitty face
              const isEar = i === 1 || i === 6;
              const isEye = i === 19 || i === 22;
              const isNose = i === 35;
              const isMouth = [43, 44].includes(i);
              
              let bgColor = 'bg-transparent';
              
              if (isEar) bgColor = 'bg-neon-pink';
              else if (isEye) bgColor = 'bg-neon-green';
              else if (isNose) bgColor = 'bg-neon-orange';
              else if (isMouth) bgColor = 'bg-neon-pink';
              
              return (
                <div 
                  key={i} 
                  className={`w-2 h-2 ${bgColor}`}
                  style={{
                    boxShadow: isEar || isEye || isNose || isMouth 
                      ? '0px 0px 2px rgba(0,0,0,0.5)' 
                      : 'none'
                  }}
                />
              );
            })}
          </div>
        );
        
      case 'glitch':
      default:
        return (
          <div className={`grid grid-cols-8 gap-0.5 w-16 h-16 ${className}`}>
            {Array(64).fill(0).map((_, i) => {
              // Random glitch pattern
              const hasPixel = Math.random() > 0.6;
              const colors = ['bg-neon-pink', 'bg-neon-blue', 'bg-neon-green', 'bg-neon-purple', 'bg-neon-yellow'];
              const color = colors[Math.floor(Math.random() * colors.length)];
              
              return (
                <div 
                  key={i} 
                  className={`w-2 h-2 ${hasPixel ? color : 'bg-transparent'}`}
                  style={{
                    boxShadow: hasPixel ? '0px 0px 2px rgba(0,0,0,0.5)' : 'none'
                  }}
                />
              );
            })}
          </div>
        );
    }
  };
  
  return renderPixelArt();
};

export default PixelArt;
