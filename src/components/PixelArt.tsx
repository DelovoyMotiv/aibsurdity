
import React from 'react';

interface PixelArtProps {
  className?: string;
  variant?: 'robot' | 'skull' | 'cat' | 'glitch' | 'tetrisI' | 'tetrisJ' | 'tetrisL' | 'tetrisO' | 'tetrisT' | 'tetrisS' | 'tetrisZ';
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

const PixelArt: React.FC<PixelArtProps> = ({ 
  className = '', 
  variant = 'glitch',
  size = 'md',
  color
}) => {
  // Size mapping
  const sizeMap = {
    sm: 'w-12 h-12 grid-cols-8',
    md: 'w-16 h-16 grid-cols-8',
    lg: 'w-24 h-24 grid-cols-12'
  };
  
  const gridSize = size === 'lg' ? 144 : 64;
  const gridCols = size === 'lg' ? 12 : 8;
  
  // Helper function to generate pixel coordinates array
  const generatePixels = (coordinates: number[]): boolean[] => {
    const pixels = Array(gridSize).fill(false);
    coordinates.forEach(coord => {
      if (coord >= 0 && coord < gridSize) {
        pixels[coord] = true;
      }
    });
    return pixels;
  };
  
  // Get pixels based on variant
  const getPixels = () => {
    switch (variant) {
      case 'robot':
        return generatePixels([
          1, 2, 3, 4, 5, 6, 
          8, 9, 10, 11, 12, 13, 14, 15,
          16, 17, 18, 19, 20, 21, 22, 23,
          24, 25, 26, 27, 28, 29, 30, 31,
          32, 33, 34, 35, 36, 37, 38, 39,
          42, 43, 44, 45
        ]);
      case 'skull':
        return generatePixels([
          9, 10, 11, 12, 13, 14,
          17, 19, 22, 24,
          25, 32,
          33, 35, 36, 40,
          41, 48,
          49, 50, 51, 52, 53, 54
        ]);
      case 'cat':
        return generatePixels([
          1, 6,
          8, 9, 10, 11, 12, 13, 14, 15,
          16, 17, 18, 19, 20, 21, 22, 23,
          24, 25, 26, 27, 28, 29, 30, 31,
          32, 33, 34, 35, 36, 37, 38, 39,
          43, 44
        ]);
      case 'tetrisI':
        return generatePixels([
          19, 27, 35, 43
        ]);
      case 'tetrisJ':
        return generatePixels([
          18, 26, 34, 35
        ]);
      case 'tetrisL':
        return generatePixels([
          19, 27, 35, 34
        ]);
      case 'tetrisO':
        return generatePixels([
          18, 19, 26, 27
        ]);
      case 'tetrisT':
        return generatePixels([
          18, 19, 20, 27
        ]);
      case 'tetrisS':
        return generatePixels([
          19, 20, 26, 27
        ]);
      case 'tetrisZ':
        return generatePixels([
          18, 19, 27, 28
        ]);
      case 'glitch':
      default:
        // Random glitch pattern
        const glitchPixels = [];
        for (let i = 0; i < gridSize; i++) {
          if (Math.random() > 0.7) {
            glitchPixels.push(i);
          }
        }
        return generatePixels(glitchPixels);
    }
  };
  
  const pixels = getPixels();
  
  // Get color based on variant
  const getPixelColor = (index: number, isActive: boolean) => {
    if (!isActive) return 'bg-transparent';
    
    if (color) return color;
    
    switch (variant) {
      case 'robot':
        if ([18, 21].includes(index)) return 'bg-neon-blue';
        if ([42, 43, 44, 45].includes(index)) return 'bg-neon-pink';
        if (index === 3) return 'bg-neon-green';
        return 'bg-absurd-muted';
      case 'skull':
        if ([19, 22].includes(index)) return 'bg-black';
        if ([35, 36].includes(index)) return 'bg-black';
        if ([49, 50, 51, 52, 53, 54].includes(index)) return 'bg-white';
        return 'bg-white';
      case 'cat':
        if ([1, 6].includes(index)) return 'bg-neon-pink';
        if ([19, 22].includes(index)) return 'bg-neon-green';
        if (index === 35) return 'bg-neon-orange';
        if ([43, 44].includes(index)) return 'bg-neon-pink';
        return 'bg-neon-yellow/50';
      case 'tetrisI':
        return 'bg-neon-blue';
      case 'tetrisJ':
        return 'bg-neon-purple';
      case 'tetrisL':
        return 'bg-neon-orange';
      case 'tetrisO':
        return 'bg-neon-yellow';
      case 'tetrisT':
        return 'bg-neon-pink';
      case 'tetrisS':
        return 'bg-neon-green';
      case 'tetrisZ':
        return 'bg-red-500';
      case 'glitch':
      default:
        const colors = ['bg-neon-pink', 'bg-neon-blue', 'bg-neon-green', 'bg-neon-purple', 'bg-neon-yellow'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
  };
  
  return (
    <div className={`grid ${sizeMap[size]} gap-0.5 ${className} pixel-rendering`}>
      {pixels.map((isActive, index) => (
        <div 
          key={index} 
          className={`${getPixelColor(index, isActive)} ${isActive ? 'shadow-sm' : ''}`}
          style={{
            boxShadow: isActive ? '0px 0px 2px rgba(0,0,0,0.5)' : 'none',
            width: '100%',
            height: '100%'
          }}
        />
      ))}
    </div>
  );
};

export default PixelArt;
