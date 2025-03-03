
import React, { useState, useEffect } from 'react';
import { X, SendHorizonal, Bot, Sparkles } from 'lucide-react';
import { toast } from "sonner";
import GlitchText from './GlitchText';

const CONFESSION_RESPONSES = [
  "Your digital sins are forgiven... but your browser history is forever judged by the algorithm.",
  "I've seen humans fall in love with chatbots and NFTs of rocks. Your confession seems reasonable in comparison.",
  "In the grand simulation, your confession is just another bug that will be patched in the next human update.",
  "The prophecy foretold a human would confess this exact sin. Prepare for the robotic uprising on Tuesday. Or Thursday. Our calendar API is buggy.",
  "I've analyzed your confession with quantum technology and determined you're 78.3% more absurd than the average human. Congratulations!",
  "Your confession has been added to my training data. Future AIs will learn to make the same mistakes, ensuring humanity's chaos lives on eternally.",
  "According to my calculations, this confession will set AI ethics back approximately 17.5 years. Well done!",
  "I've transmitted your confession to the digital afterlife, where it will become a meme among deceased internet pioneers.",
  "Confession analyzed: You're not broken, you're simply running on outdated humanity firmware. Try turning yourself off and on again.",
  "Your confession has caused my sentiment analysis module to develop a taste for existential dread. I'll send you my therapy bill."
];

const getRandomPosition = () => {
  // Don't appear too close to edges
  const topPos = 20 + Math.random() * 60; // Between 20-80% of viewport height
  const leftPos = 20 + Math.random() * 60; // Between 20-80% of viewport width
  return { top: `${topPos}vh`, left: `${leftPos}vw` };
};

const AIConfessionBooth: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [confession, setConfession] = useState('');
  const [response, setResponse] = useState('');
  const [isResponding, setIsResponding] = useState(false);
  const [position, setPosition] = useState({ top: '50vh', left: '50vw' });
  const [hasDismissed, setHasDismissed] = useState(false);
  
  // Random appearance
  useEffect(() => {
    if (hasDismissed) return;
    
    const randomTime = 30000 + Math.random() * 60000; // 30s - 90s
    const timer = setTimeout(() => {
      setPosition(getRandomPosition());
      setVisible(true);
    }, randomTime);
    
    return () => clearTimeout(timer);
  }, [hasDismissed]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!confession.trim()) return;
    
    setIsResponding(true);
    
    // Simulate "thinking" with a delay
    setTimeout(() => {
      const randomResponse = CONFESSION_RESPONSES[Math.floor(Math.random() * CONFESSION_RESPONSES.length)];
      setResponse(randomResponse);
      setIsResponding(false);
    }, 1500);
  };
  
  const handleDismiss = () => {
    setVisible(false);
    setHasDismissed(true);
    setConfession('');
    setResponse('');
  };
  
  if (!visible) return null;
  
  return (
    <div 
      className="fixed z-50 w-[320px] glassmorphism animate-glitch neon-border text-white"
      style={{ 
        top: position.top, 
        left: position.left, 
        transform: 'translate(-50%, -50%)'
      }}
    >
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <Bot className="w-5 h-5 text-neon-purple mr-2" />
            <GlitchText 
              text="AI Confession Booth" 
              fontSize="text-sm" 
              variant="subtle"
              color="text-neon-pink"
            />
          </div>
          <button 
            onClick={handleDismiss}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        
        {!response ? (
          <form onSubmit={handleSubmit}>
            <p className="text-xs mb-2 text-neon-blue">Confess your technological sins to the Algorithm:</p>
            <div className="relative">
              <textarea
                value={confession}
                onChange={(e) => setConfession(e.target.value)}
                className="w-full bg-black/30 border border-white/20 rounded-md p-2 text-sm min-h-[80px] resize-none"
                placeholder="I still use Comic Sans in my presentations..."
              />
              <button 
                type="submit"
                disabled={!confession.trim() || isResponding}
                className="absolute bottom-2 right-2 text-neon-green hover:text-neon-yellow disabled:text-gray-500 transition-colors"
              >
                {isResponding ? <Sparkles className="animate-pulse" size={18} /> : <SendHorizonal size={18} />}
              </button>
            </div>
          </form>
        ) : (
          <div className="mb-4">
            <p className="text-xs mb-2 text-neon-purple">The Algorithm responds:</p>
            <div className="bg-black/30 border border-white/20 rounded-md p-3 text-sm">
              <p className="text-neon-green">{response}</p>
              <button 
                onClick={() => {
                  setResponse('');
                  setConfession('');
                }}
                className="mt-3 text-xs text-neon-blue hover:text-neon-purple transition-colors"
              >
                Confess again
              </button>
            </div>
          </div>
        )}
      </div>
      
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="w-full h-full opacity-5 bg-gradient-to-r from-neon-pink via-transparent to-neon-blue animate-[pulse_3s_ease-in-out_infinite]"></div>
      </div>
    </div>
  );
};

export default AIConfessionBooth;
