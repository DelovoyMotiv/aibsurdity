importtypescript
import React, { useEffect, useRef, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Crown, Zap, Sparkles } from 'lucide-react';
import GlitchText from './GlitchText';
import PixelArt from './PixelArt';

// Mock data for top ABSURD token holders
const HOLDERS_DATA = [
  { name: 'Absurd Whale #1', value: 12000000, address: '0x71C...3E4a' },
  { name: 'Meme Lord', value: 8500000, address: '0xF3B...a21c' },
  { name: 'Diamond Hands', value: 6300000, address: '0x8aC...5F2d' },
  { name: 'Early Bird', value: 5100000, address: '0x6dE...7B4a' },
  { name: 'Crypto Degen', value: 4700000, address: '0x3eC...9D1b' },
  { name: 'Absurd Dev', value: 3800000, address: '0x2aB...4C7c' },
  { name: 'Pool', value: 3200000, address: '0x92D...1E5f' },
  { name: 'Exchange', value: 2900000, address: '0x45F...0A3d' },
  { name: 'Others', value: 53500000, address: 'Multiple Addresses' },
];

// Neon colors for the chart
const NEON_COLORS = [
  '#ff00ff', // magenta
  '#00ffff', // cyan
  '#00ff00', // green
  '#ffff00', // yellow
  '#ff00aa', // pink
  '#aa00ff', // purple
  '#ff7700', // orange
  '#0077ff', // blue
  '#77ff00', // lime
];

// Cyberpunk 8125 Glass Pixel Chart
const CyberpunkPixelChart = ({ data }: { data: typeof HOLDERS_DATA }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pixels, setPixels] = useState<JSX.Element[]>([]);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [rotation, setRotation] = useState({ x: 15, y: 25 });
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Calculate total value for percentage calculations
    const totalValue = data.reduce((sum, item) => sum + item.value, 0);
    
    // Generate a distribution of pixels based on data
    const generatePixels = () => {
      const newPixels: JSX.Element[] = [];
      const gridSize = 12; // Grid size for our 3D space
      const totalPixels = gridSize * gridSize * gridSize;
      
      // Map our data to 3D space
      let pixelIndex = 0;
      data.forEach((item, dataIndex) => {
        // Calculate number of pixels for this data point based on its percentage
        const percentage = item.value / totalValue;
        const pixelCount = Math.max(1, Math.floor(percentage * totalPixels * 0.8)); // Scale to 80% of space
        
        for (let i = 0; i < pixelCount && pixelIndex < totalPixels; i++) {
          // Calculate 3D position
          const z = Math.floor(pixelIndex / (gridSize * gridSize));
          const remainder = pixelIndex % (gridSize * gridSize);
          const y = Math.floor(remainder / gridSize);
          const x = remainder % gridSize;
          
          // Add pixel with 3D transformation
          newPixels.push(
            <div 
              key={`pixel-${pixelIndex}`}
              className="absolute w-2 h-2 rounded-sm transform-gpu transition-all duration-500 ease-in-out"
              style={{
                backgroundColor: NEON_COLORS[dataIndex % NEON_COLORS.length],
                boxShadow: `0 0 8px ${NEON_COLORS[dataIndex % NEON_COLORS.length]}`,
                opacity: hoverIndex === dataIndex ? 1 : 0.7,
                transform: `translateX(${x * 20}px) translateY(${y * 20}px) translateZ(${z * 20}px) scale(${hoverIndex === dataIndex ? 1.5 : 1})`,
                filter: `blur(${hoverIndex === dataIndex ? 0 : 0.5}px)`,
                zIndex: hoverIndex === dataIndex ? 10 : 1,
              }}
              onMouseEnter={() => setHoverIndex(dataIndex)}
              onMouseLeave={() => setHoverIndex(null)}
              data-holder={item.name}
              data-value={item.value.toLocaleString()}
            />
          );
          
          pixelIndex++;
        }
      });
      
      return newPixels;
    };
    
    setPixels(generatePixels());
    
    // Add mouse movement effect for 3D rotation
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate rotation based on mouse position relative to center
      const newRotationX = ((e.clientY - centerY) / rect.height) * 30;
      const newRotationY = ((e.clientX - centerX) / rect.width) * 30;
      
      setRotation({ x: newRotationX, y: newRotationY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [data, hoverIndex]);
  
  return (
    <div className="relative w-full h-[300px] flex items-center justify-center overflow-hidden">
      {/* Glassmorphic container */}
      <div 
        ref={containerRef}
        className="relative w-[250px] h-[250px] rounded-xl glassmorphism perspective-500"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Pixelated 3D chart */}
        <div className="absolute inset-0 transform-gpu" style={{ transformStyle: 'preserve-3d' }}>
          {pixels}
        </div>
        
        {/* Holographic grid effect */}
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 opacity-10 pointer-events-none">
          {Array.from({ length: 144 }).map((_, i) => (
            <div 
              key={`grid-${i}`} 
              className="border border-neon-blue/20"
              style={{
                boxShadow: `0 0 5px rgba(0, 255, 255, 0.2)`,
              }}
            />
          ))}
        </div>
        
        {/* Scanner effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="w-full h-full bg-gradient-to-b from-transparent via-neon-blue/10 to-transparent absolute opacity-50 animate-scan-line"></div>
        </div>
      </div>
      
      {/* Floating data points */}
      <div className="absolute top-2 right-2 glassmorphism-2 p-2 text-xs font-pixel rounded-lg">
        <div className="text-neon-pink animate-pulse">HOVER TO INTERACT</div>
      </div>
      
      {/* AI Rendering Status */}
      <div className="absolute bottom-2 left-2 flex items-center space-x-2 text-xs">
        <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
        <span className="text-neon-green font-pixel text-xs">AI RENDERING ACTIVE</span>
      </div>
    </div>
  );
};

// Custom tooltip component with neon styling
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glassmorphism-2 p-3 border border-white/20 shadow-[0_0_15px_rgba(255,0,255,0.5)]">
        <p className="font-pixel text-neon-pink text-xs">{payload[0].name}</p>
        <p className="font-pixel text-neon-blue text-xs">
          {payload[0].value.toLocaleString()} AIB
        </p>
        <p className="font-pixel text-neon-green text-xs truncate max-w-[200px]">
          {payload[0].payload.address}
        </p>
      </div>
    );
  }
  return null;
};

// Custom legend component
const CustomLegend = ({ payload }: any) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mt-4">
      {payload.map((entry: any, index: number) => (
        <div 
          key={`legend-${index}`} 
          className="flex items-center px-2 py-1 rounded-full text-xs font-pixel"
          style={{ 
            backgroundColor: `${entry.color}20`,
            boxShadow: `0 0 8px ${entry.color}80`
          }}
        >
          <div 
            className="w-3 h-3 rounded-full mr-1" 
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-white">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

const TopHoldersChart = () => {
  const [showRegularChart, setShowRegularChart] = useState(false);
  
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center justify-center mb-4 space-x-2">
        <Crown className="text-neon-yellow animate-pulse" size={24} />
        <GlitchText 
          text="100 Legends" 
          fontSize="text-2xl md:text-3xl" 
          color="text-white" 
          className="font-pixel"
          variant="pixel"
          as="h3"
          pixelated={true}
        />
        <Sparkles className="text-neon-purple animate-pulse" size={24} />
      </div>
      
      <div className="text-center mb-6">
        <p className="font-pixel text-neon-green text-sm w-full">Top ABSURD Token Holders</p>
        <div className="flex justify-center items-center space-x-2 mt-1">
          <Zap size={14} className="text-neon-pink animate-pulse" />
          <p className="text-xs text-gray-300 font-pixel w-full">Data from Solscan Explorer</p>
          <Zap size={14} className="text-neon-pink animate-pulse" />
        </div>
      </div>
      
      <div className="flex-grow w-full relative">
        {/* Toggle switch for chart type */}
        <button 
          onClick={() => setShowRegularChart(!showRegularChart)}
          className="absolute top-0 right-0 z-10 bg-absurd-dark/50 hover:bg-absurd-dark px-2 py-1 rounded font-pixel text-xs text-neon-blue border border-neon-blue/30 transition-colors"
        >
          {showRegularChart ? 'Show 8125 View' : 'Show Classic View'}
        </button>
        
        {/* Chart background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-blue-900/20 rounded-xl"></div>
        
        {showRegularChart ? (
          // Regular pie chart view
          <div className="h-[300px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={HOLDERS_DATA}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  animationDuration={1500}
                  animationBegin={200}
                  className="filter drop-shadow-[0_0_8px_rgba(255,0,255,0.7)]"
                >
                  {HOLDERS_DATA.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={NEON_COLORS[index % NEON_COLORS.length]} 
                      stroke="rgba(0,0,0,0.3)"
                      strokeWidth={1}
                      className="hover:opacity-90 transition-opacity"
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend content={<CustomLegend />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          // Cyberpunk 8125 3D glass pixel chart
          <CyberpunkPixelChart data={HOLDERS_DATA} />
        )}
      </div>
      
      <div className="mt-4 px-4 py-3 glassmorphism-2 rounded-xl">
        <div className="flex flex-col space-y-3">
          <div className="flex justify-between items-center border-b border-white/10 pb-2">
            <div className="flex items-center">
              <Crown className="text-neon-yellow mr-2" size={16} />
              <span className="font-pixel text-neon-yellow text-xs">Top Holder</span>
            </div>
            <span className="font-pixel text-neon-blue text-xs w-full text-right">12,000,000 AIB</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="font-pixel text-gray-300 text-xs">Total Holders</span>
            </div>
            <span className="font-pixel text-neon-pink text-xs w-full text-right animate-pixel-flicker">100 Legends</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHoldersChart;
