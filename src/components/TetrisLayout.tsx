
import React from 'react';

interface TetrisBlockProps {
  className?: string;
  color?: string;
  delay?: number;
  shape?: string;
  rotation?: number;
  children: React.ReactNode;
}

const TetrisBlock = ({ className, color, delay, shape, rotation, children }: TetrisBlockProps) => {
  // Add shape-specific styling based on the shape prop
  const getShapeClasses = () => {
    switch (shape) {
      case 'I':
        return 'col-span-full md:col-span-12';
      case 'L':
        return 'col-span-full md:col-span-6';
      case 'T':
        return 'col-span-full md:col-span-6';
      case 'O':
        return 'col-span-full md:col-span-6';
      case 'Z':
        return 'col-span-full md:col-span-4';
      case 'S':
        return 'col-span-full md:col-span-12';
      default:
        return 'col-span-full';
    }
  };

  return (
    <div
      className={`${className || ''} ${color || ''} ${getShapeClasses()} ${shape ? `shape-${shape}` : ''}`}
      style={{
        transform: rotation ? `rotate(${rotation}deg)` : undefined,
        transitionDelay: delay ? `${delay}s` : undefined,
      }}
    >
      {children}
    </div>
  );
};

const TetrisLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 py-6">
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return null;
        
        // Just pass through the child props, don't add or override anything
        return child;
      })}
    </div>
  );
};

export { TetrisLayout, TetrisBlock };
