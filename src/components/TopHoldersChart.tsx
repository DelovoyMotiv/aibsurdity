
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Crown, Zap, Sparkles } from 'lucide-react';
import GlitchText from './GlitchText';

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
      
      <div className="flex-grow w-full h-[300px] relative">
        {/* Animated scan line effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="w-full h-[2px] bg-neon-blue/50 absolute animate-scan-line"></div>
        </div>
        
        {/* Chart background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-blue-900/20 rounded-xl"></div>
        
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
