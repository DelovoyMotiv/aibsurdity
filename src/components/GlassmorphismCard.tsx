
import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface GlassmorphismCardProps {
  children: React.ReactNode;
  className?: string;
  gradientType?: 'purple' | 'blue' | 'pink' | 'green' | 'none';
  intensity?: 'low' | 'medium' | 'high';
  refractionEffect?: boolean;
}

const GlassmorphismCard: React.FC<GlassmorphismCardProps> = ({ 
  children, 
  className,
  gradientType = 'none',
  intensity = 'medium',
  refractionEffect = true
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!cardRef.current || !refractionEffect) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const card = cardRef.current!;
      const rect = card.getBoundingClientRect();
      
      // Calculate relative position of mouse in the element (0-100%)
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      // Update CSS variables for the refraction effect
      card.style.setProperty('--x', `${x}%`);
      card.style.setProperty('--y', `${y}%`);
    };
    
    const card = cardRef.current;
    card.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
    };
  }, [refractionEffect]);
  
  // Determine intensity class
  const intensityClass = {
    low: 'bg-white/5 before:opacity-20',
    medium: 'bg-white/10 before:opacity-30',
    high: 'bg-white/15 before:opacity-40'
  }[intensity];
  
  // Determine gradient class
  const gradientClass = gradientType !== 'none' ? `live-gradient live-gradient-${gradientType}` : '';
  
  return (
    <div 
      ref={cardRef}
      className={cn(
        'glassmorphism-2',
        refractionEffect && 'light-refraction',
        intensityClass,
        gradientClass,
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassmorphismCard;
