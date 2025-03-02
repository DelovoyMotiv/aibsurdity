
import React, { ReactNode } from 'react';

interface TetrisBlockProps {
  children: ReactNode;
  className?: string;
  color?: string;
  delay?: number;
  width?: string;
  shape?: 'I' | 'J' | 'L' | 'O' | 'S' | 'T' | 'Z' | 'default';
  rotation?: 0 | 90 | 180 | 270;
}

export const TetrisBlock: React.FC<TetrisBlockProps> = ({ 
  children, 
  className = '', 
  color = 'bg-absurd-dark', 
  delay = 0,
  width = 'w-full',
  shape = 'default',
  rotation = 0
}) => {
  // Shape-specific classes
  const getShapeClasses = () => {
    switch (shape) {
      case 'I':
        return 'before:content-[""] before:absolute before:w-full before:h-1/4 before:bg-inherit before:-top-[25%] before:left-0 before:border-4 before:border-black after:content-[""] after:absolute after:w-full after:h-1/4 after:bg-inherit after:top-full after:left-0 after:border-4 after:border-black';
      case 'L':
        return 'before:content-[""] before:absolute before:w-1/3 before:h-1/4 before:bg-inherit before:top-0 before:-right-[33%] before:border-4 before:border-black';
      case 'J':
        return 'before:content-[""] before:absolute before:w-1/3 before:h-1/4 before:bg-inherit before:top-0 before:-left-[33%] before:border-4 before:border-black';
      case 'O':
        return 'before:content-[""] before:absolute before:w-1/2 before:h-1/2 before:bg-inherit before:-top-[50%] before:-right-[50%] before:border-4 before:border-black';
      case 'S':
        return 'before:content-[""] before:absolute before:w-1/2 before:h-1/4 before:bg-inherit before:-top-[25%] before:right-0 before:border-4 before:border-black after:content-[""] after:absolute after:w-1/2 after:h-1/4 after:bg-inherit after:top-full after:left-0 after:border-4 after:border-black';
      case 'Z':
        return 'before:content-[""] before:absolute before:w-1/2 before:h-1/4 before:bg-inherit before:-top-[25%] before:left-0 before:border-4 before:border-black after:content-[""] after:absolute after:w-1/2 after:h-1/4 after:bg-inherit after:top-full after:right-0 after:border-4 after:border-black';
      case 'T':
        return 'before:content-[""] before:absolute before:w-1/3 before:h-1/4 before:bg-inherit before:-top-[25%] before:left-1/3 before:border-4 before:border-black';
      default:
        return '';
    }
  };

  // Rotation transform
  const getRotationStyle = () => {
    return {
      transform: `rotate(${rotation}deg)`,
      transformOrigin: '50% 50%',
      animationDelay: `${delay}s`
    };
  };

  return (
    <div 
      className={`tetris-block ${color} ${width} p-6 rounded-lg ${className} ${getShapeClasses()} relative overflow-visible`}
      style={getRotationStyle()}
    >
      <div className="relative z-10 pixel-texture">
        {children}
      </div>
    </div>
  );
};

interface TetrisLayoutProps {
  children: ReactNode;
  className?: string;
}

const TetrisLayout: React.FC<TetrisLayoutProps> = ({ children, className = '' }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-12 gap-4 tetris-grid ${className}`}>
      {children}
    </div>
  );
};

export default TetrisLayout;
