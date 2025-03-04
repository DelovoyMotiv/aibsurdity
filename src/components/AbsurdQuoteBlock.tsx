
import React from 'react';

interface AbsurdQuoteBlockProps {
  text: string;
  className?: string;
}

const AbsurdQuoteBlock: React.FC<AbsurdQuoteBlockProps> = ({ text, className = "" }) => {
  return (
    <div className={`holographic-card rounded-lg p-6 my-6 max-w-3xl mx-auto ${className}`}>
      <p className="text-8bit-glow text-center font-pixel neon-text-subtle">
        {text}
      </p>
    </div>
  );
};

export default AbsurdQuoteBlock;
