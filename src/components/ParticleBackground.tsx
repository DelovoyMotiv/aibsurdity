
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
    
    // Draw a single morphing blob
    const drawBlob = (blob: Blob, timestamp: number) => {
      const time = timestamp * 0.001; // Convert milliseconds to seconds
      const points = 8; // Number of points to create the blob
      const twoPi = Math.PI * 2;
      
      // Blob movement using perlin-like motion
      const centerX = blob.x + Math.sin(time * 0.2 + blob.xOffset) * 100;
      const centerY = blob.y + Math.cos(time * 0.3 + blob.yOffset) * 100;
      
      // Create gradient fill for depth perception
      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, blob.radius * 1.5
      );
      
      // Parse the rgb values from the color string
      const colorMatch = blob.color.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
      if (colorMatch) {
        const [_, r, g, b, a] = colorMatch;
        
        // Create a 3D-like effect with the gradient
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${parseFloat(a) * 2})`);
        gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${parseFloat(a)})`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
      }
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      
      // Start drawing the blob with bezier curves for smoother shapes
      for (let i = 0; i <= points; i++) {
        const angle = (i / points) * twoPi;
        const nextAngle = ((i + 1) / points) * twoPi;
        
        // Create wavy radius for organic feeling
        const waveX = Math.sin(angle * 3 + time + blob.angle) * blob.amplitude;
        const waveY = Math.cos(angle * 2 + time + blob.angle) * blob.amplitude;
        const nextWaveX = Math.sin(nextAngle * 3 + time + blob.angle) * blob.amplitude;
        const nextWaveY = Math.cos(nextAngle * 2 + time + blob.angle) * blob.amplitude;
        
        const radius = blob.radius + waveX + waveY;
        const nextRadius = blob.radius + nextWaveX + nextWaveY;
        
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        const nextX = centerX + Math.cos(nextAngle) * nextRadius;
        const nextY = centerY + Math.sin(nextAngle) * nextRadius;
        
        // Control points for bezier curves
        const cpX1 = centerX + Math.cos(angle + 0.1) * (radius * 1.2);
        const cpY1 = centerY + Math.sin(angle + 0.1) * (radius * 1.2);
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.quadraticCurveTo(cpX1, cpY1, nextX, nextY);
        }
      }
      
      ctx.closePath();
      ctx.fill();
      
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
