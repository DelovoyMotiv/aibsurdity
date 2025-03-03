import React, { useEffect, useRef } from 'react';

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });
  const blobsRef = useRef<Blob[]>([]);
  
  interface Blob {
    x: number;
    y: number;
    radius: number;
    xOffset: number;
    yOffset: number;
    angle: number;
    angleSpeed: number;
    amplitude: number;
    color: string;
    opacity: number;
    depth: number;
  }
  
  const colors = [
    { r: 255, g: 0, b: 255 },    // neon pink
    { r: 0, g: 255, b: 255 },    // neon cyan
    { r: 255, g: 255, b: 0 },    // neon yellow
    { r: 0, g: 255, b: 0 },      // neon green
    { r: 139, g: 92, b: 246 },   // neon purple
    { r: 249, g: 115, b: 22 }    // neon orange
  ];
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initBlobs();
    };
    
    const initBlobs = () => {
      blobsRef.current = [];
      const blobCount = 6; // Fewer but more complex blobs
      
      for (let i = 0; i < blobCount; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const depth = 0.1 + Math.random() * 0.9; // 0.1 to 1.0, controls z-index and size
        
        blobsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: 100 + (Math.random() * 150 * depth), // Larger blobs
          xOffset: Math.random() * 2000,
          yOffset: Math.random() * 2000,
          angle: Math.random() * Math.PI * 2,
          angleSpeed: 0.0001 + Math.random() * 0.0001,
          amplitude: 30 + Math.random() * 50,
          color: `rgba(${color.r}, ${color.g}, ${color.b}, 0.05)`,
          opacity: 0.05 + Math.random() * 0.05, // Very subtle
          depth: depth
        });
      }
    };
    
    // Enhanced blob drawing with improved depth and glass-like effects
    const drawBlob = (blob: Blob, timestamp: number) => {
      const time = timestamp * 0.001; // Convert milliseconds to seconds
      const points = 12; // Increased points for smoother blob shape
      const twoPi = Math.PI * 2;
      
      // Enhanced blob movement with more natural flow
      const centerX = blob.x + Math.sin(time * 0.2 + blob.xOffset) * 100 * blob.depth;
      const centerY = blob.y + Math.cos(time * 0.3 + blob.yOffset) * 100 * blob.depth;
      
      // Create more complex gradient fill for glass-like effect
      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, blob.radius * 1.5
      );
      
      // Parse the rgb values from the color string
      const colorMatch = blob.color.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
      if (colorMatch) {
        const [_, r, g, b, a] = colorMatch;
        
        // Create a more complex, glass-like gradient
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${parseFloat(a) * 2.5})`);
        gradient.addColorStop(0.3, `rgba(${r}, ${g}, ${b}, ${parseFloat(a) * 1.5})`);
        gradient.addColorStop(0.7, `rgba(${r}, ${g}, ${b}, ${parseFloat(a) * 0.8})`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
      }
      
      ctx.fillStyle = gradient;
      
      // Draw blob with bezier curves
      ctx.beginPath();
      
      for (let i = 0; i <= points; i++) {
        const angle = (i / points) * twoPi;
        const nextAngle = ((i + 1) / points) * twoPi;
        
        // Create more complex wavy radius with multiple sine/cosine waves
        const wave1 = Math.sin(angle * 3 + time + blob.angle) * blob.amplitude;
        const wave2 = Math.cos(angle * 2 + time * 1.5 + blob.angle) * (blob.amplitude * 0.8);
        const wave3 = Math.sin(angle * 5 + time * 0.7 + blob.angle) * (blob.amplitude * 0.3);
        
        const nextWave1 = Math.sin(nextAngle * 3 + time + blob.angle) * blob.amplitude;
        const nextWave2 = Math.cos(nextAngle * 2 + time * 1.5 + blob.angle) * (blob.amplitude * 0.8);
        const nextWave3 = Math.sin(nextAngle * 5 + time * 0.7 + blob.angle) * (blob.amplitude * 0.3);
        
        const radius = blob.radius + wave1 + wave2 + wave3;
        const nextRadius = blob.radius + nextWave1 + nextWave2 + nextWave3;
        
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        const nextX = centerX + Math.cos(nextAngle) * nextRadius;
        const nextY = centerY + Math.sin(nextAngle) * nextRadius;
        
        // Enhanced control points for more fluid bezier curves
        const cpX1 = centerX + Math.cos(angle + 0.1) * (radius * 1.2);
        const cpY1 = centerY + Math.sin(angle + 0.1) * (radius * 1.2);
        const cpX2 = centerX + Math.cos(nextAngle - 0.1) * (nextRadius * 1.2);
        const cpY2 = centerY + Math.sin(nextAngle - 0.1) * (nextRadius * 1.2);
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          // Use cubic bezier for smoother curves
          ctx.bezierCurveTo(cpX1, cpY1, cpX2, cpY2, nextX, nextY);
        }
      }
      
      ctx.closePath();
      ctx.fill();
      
      // Add a subtle highlight to enhance the glass effect
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      ctx.beginPath();
      
      const highlightRadius = blob.radius * 0.7;
      const highlightX = centerX + Math.cos(time * 0.5) * (blob.radius * 0.2);
      const highlightY = centerY + Math.sin(time * 0.5) * (blob.radius * 0.2);
      
      ctx.arc(highlightX, highlightY, highlightRadius, 0, Math.PI * 2);
      
      const highlightGradient = ctx.createRadialGradient(
        highlightX, highlightY, 0,
        highlightX, highlightY, highlightRadius
      );
      
      highlightGradient.addColorStop(0, `rgba(255, 255, 255, ${0.05 * blob.depth})`);
      highlightGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      ctx.fillStyle = highlightGradient;
      ctx.fill();
      ctx.restore();
      
      // Update blob angle for continuous morphing
      blob.angle += blob.angleSpeed;
    };
    
    const animate = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Sort blobs by depth for proper layering (3D effect)
      const sortedBlobs = [...blobsRef.current].sort((a, b) => a.depth - b.depth);
      
      // Draw each blob
      sortedBlobs.forEach(blob => {
        drawBlob(blob, timestamp);
      });
      
      // Interactive effect - make blobs react to mouse position
      sortedBlobs.forEach(blob => {
        const dx = mouseRef.current.x - blob.x;
        const dy = mouseRef.current.y - blob.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Subtle attraction to mouse
        if (distance < 300) {
          const force = (300 - distance) / 3000;
          blob.x += dx * force * blob.depth;
          blob.y += dy * force * blob.depth;
        }
      });
      
      requestRef.current = requestAnimationFrame(animate);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    
    resizeCanvas();
    requestRef.current = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);
  
  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
};

export default ParticleBackground;
