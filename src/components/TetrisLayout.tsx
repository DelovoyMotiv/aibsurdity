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
  return (
    <div
      className={`transition-transform duration-500 ease-in-out ${className} ${color} ${shape ? `shape-${shape}` : ''}`}
      style={{
        transform: `rotate(${rotation || 0}deg)`,
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
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return null;
        
        // Add premium transition effects
        const tetrisBlockProps = {
          ...child.props,
          className: `${child.props.className || ''} animate-subtle-float`,
          style: {
            ...child.props.style,
            transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)', // Premium bounce effect
            transitionDuration: '0.8s', // Slightly slower for more elegant movement
            boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.3)' // Premium shadow
          }
        };
        
        return React.cloneElement(child, tetrisBlockProps);
      })}
    </div>
  );
};

export { TetrisLayout, TetrisBlock };
