
import React, { ReactNode } from 'react';

interface TetrisBlockProps {
  children: ReactNode;
  className?: string;
  color?: string;
  delay?: number;
  width?: string;
}

export const TetrisBlock: React.FC<TetrisBlockProps> = ({ 
  children, 
  className = '', 
  color = 'bg-absurd-dark', 
  delay = 0,
  width = 'w-full'
}) => {
  return (
    <div 
      className={`tetris-block ${color} ${width} p-6 rounded-lg ${className}`}
      style={{ 
        animationDelay: `${delay}s`,
        transformOrigin: '50% 50%'
      }}
    >
      {children}
    </div>
  );
};

interface TetrisLayoutProps {
  children: ReactNode;
  className?: string;
}

const TetrisLayout: React.FC<TetrisLayoutProps> = ({ children, className = '' }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-12 gap-4 ${className}`}>
      {children}
    </div>
  );
};

export default TetrisLayout;
