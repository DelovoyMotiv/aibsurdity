import React, { useState, useEffect, useRef } from 'react';
import { Twitter, ExternalLink, Copy, Check, Github, MessageCircle } from 'lucide-react';
import { toast } from "sonner";
import GlitchText from './GlitchText';

const Footer = () => {
  const [contractCopied, setContractCopied] = useState(false);
  const [walletCopied, setWalletCopied] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const vhsOverlayRef = useRef<HTMLDivElement>(null);
  const quantumNoiseRef = useRef<HTMLDivElement>(null);
  const hologramRef = useRef<HTMLDivElement>(null);
  
  const contractAddress = "0xabsurd...42069";
  const supportWallet = "0x00000000000000000000";
  
  // VHS overlay, quantum noise, and holographic effects
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      // Randomly activate glitch effect
      if (Math.random() > 0.7) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 800 + Math.random() * 1200);
      }
      
      // Animate VHS overlay
      if (vhsOverlayRef.current) {
        vhsOverlayRef.current.style.opacity = (Math.random() * 0.3 + 0.1).toString();
        vhsOverlayRef.current.style.transform = `translateY(${Math.random() * 4 - 2}px)`;
      }
      
      // Animate quantum noise
      if (quantumNoiseRef.current) {
        const hue = Math.floor(Math.random() * 360);
        quantumNoiseRef.current.style.filter = `hue-rotate(${hue}deg)`;
        quantumNoiseRef.current.style.opacity = (Math.random() * 0.2 + 0.05).toString();
      }

      // Animate holographic overlay
      if (hologramRef.current) {
        const clipAngle = Math.random() * 10;
        hologramRef.current.style.clipPath = `polygon(${clipAngle}% 0%, 100% 0%, ${100-clipAngle}% 100%, 0% 100%)`;
      }
    }, 2000);
    
    return () => clearInterval(glitchInterval);
  }, []);

  // Mouse position tracking for holographic effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      setMousePosition({ x, y });
      
      if (hologramRef.current) {
        const rect = hologramRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const offsetX = ((x - centerX) / window.innerWidth) * 20;
        const offsetY = ((y - centerY) / window.innerHeight) * 20;
        
        hologramRef.current.style.transform = `perspective(1000px) rotateX(${-offsetY}deg) rotateY(${offsetX}deg)`;
        
        // Update holographic gradient position
        const gradientX = 50 + offsetX * 2;
        const gradientY = 50 + offsetY * 2;
        hologramRef.current.style.backgroundPosition = `${gradientX}% ${gradientY}%`;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  const copyToClipboard = (text: string, type: 'contract' | 'wallet') => {
    navigator.clipboard.writeText(text)
      .then(() => {
        if (type === 'contract') {
          setContractCopied(true);
          toast.success("Contract address copied!");
          setTimeout(() => setContractCopied(false), 2000);
        } else {
          setWalletCopied(true);
          toast.success("Wallet address copied!");
          setTimeout(() => setWalletCopied(false), 2000);
        }
      })
      .catch(err => {
        toast.error("Failed to copy: " + err.message);
      });
  };
  
  return (
    <footer className="bg-absurd-dark border-t border-gray-800 py-12 mt-auto relative overflow-hidden">
      {/* VHS Overlay */}
      <div 
        ref={vhsOverlayRef}
        className="absolute inset-0 pointer-events-none z-10 opacity-20"
        style={{
          background: `repeating-linear-gradient(
            to bottom,
            transparent,
            transparent 2px,
            rgba(255, 0, 255, 0.2) 3px,
            rgba(0, 255, 255, 0.2) 4px
          )`,
          animation: 'vhs-jitter 0.5s infinite',
          mixBlendMode: 'exclusion'
        }}
      />
      
      {/* Quantum Noise Background */}
      <div 
        ref={quantumNoiseRef}
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          background: 'radial-gradient(circle at center, rgba(255,0,255,0.3) 0%, rgba(0,255,255,0.3) 50%, rgba(255,255,0,0.3) 100%)',
          backgroundSize: '200% 200%',
          animation: 'data-corruption 15s ease infinite',
          mixBlendMode: 'screen'
        }}
      />
      
      {/* Holographic Overlay */}
      <div 
        ref={hologramRef}
        className="absolute inset-0 pointer-events-none z-5 holographic-overlay"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(0,255,255,0.2) 25%, rgba(255,0,255,0.2) 50%, rgba(0,255,255,0.2) 75%, rgba(255,255,255,0.1) 100%)',
          backgroundSize: '400% 400%',
          transition: 'transform 0.1s ease-out, background-position 0.1s ease-out',
          transform: 'perspective(1000px)',
          mixBlendMode: 'overlay'
        }}
      />
      
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 relative z-20">
        <div className="text-left">
          <h3 className={`text-neon-blue font-pixel text-lg mb-4 ${glitchActive ? 'animate-broken-glitch' : ''}`}></h3>
          <p className="text-gray-400 text-sm mb-4 font-pixel">
            <GlitchText 
              text="Absolutely everything that surrounds you was once someone's absurd idea..." 
              variant={Math.random() > 0.5 ? 'broken' : 'fragmented'}
              interactive={true}
            />
          </p>
          <div className="flex space-x-4">
            <a href="https://twitter.com/absurdity" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-neon-blue transition-colors holographic-button">
              <Twitter size={20} className={glitchActive ? 'animate-distort-text' : ''} />
            </a>
            <a href="https://t.me/absurdity" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-neon-purple transition-colors holographic-button">
              <MessageCircle size={20} className={glitchActive ? 'animate-fragmented-glitch' : ''} />
            </a>
            <a href="https://github.com/absurdity" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-neon-green transition-colors holographic-button">
              <Github size={20} className={glitchActive ? 'animate-broken-shake' : ''} />
            </a>
            <a href="https://absurdity.wtf" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-neon-yellow transition-colors holographic-button">
              <ExternalLink size={20} className={glitchActive ? 'animate-broken-rotate' : ''} />
            </a>
          </div>
        </div>
        
        <div className="text-left">
          <h3 className={`text-neon-pink font-pixel text-lg mb-4 ${glitchActive ? 'animate-broken-flicker' : ''}`}></h3>
          <div className="space-y-3">
            <div className={`flex items-center justify-between text-gray-400 text-sm p-3 bg-gray-900 rounded font-pixel ${glitchActive ? 'animate-reality-glitch' : ''} holographic-card`}>
              <span>Contract:</span>
              <span className="flex items-center">
                {contractAddress}
                <button 
                  onClick={() => copyToClipboard(contractAddress, 'contract')} 
                  className="ml-2 hover:text-neon-blue transition-colors holographic-button"
                >
                  {contractCopied ? <Check size={16} className="text-neon-green" /> : <Copy size={16} />}
                </button>
              </span>
            </div>
            
            <div className={`flex items-center justify-between text-gray-400 text-sm p-3 bg-gray-900 rounded font-pixel ${glitchActive ? 'animate-broken-warp' : ''} holographic-card`}>
              <span>Fund:</span>
              <span className="flex items-center">
                {supportWallet}
                <button 
                  onClick={() => copyToClipboard(supportWallet, 'wallet')} 
                  className="ml-2 hover:text-neon-pink transition-colors holographic-button"
                >
                  {walletCopied ? <Check size={16} className="text-neon-green" /> : <Copy size={16} />}
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto px-6 mt-8 pt-8 border-t border-gray-800">
        <p className="text-center text-gray-500 text-xs font-pixel">
          © {new Date().getFullYear()} AIbsurdity. All rights absurdified. This is not financial advice—it's a joke with a blockchain.
        </p>
        <p className="text-center text-neon-orange text-xs mt-4 font-pixel animate-pulse">
          <GlitchText 
            text="If nothing works out for us... we'll leave, but as a farewell we'll slam the door so hard that the world will tremble!" 
            variant="quantum"
            interactive={true}
            fontSize="text-xs"
          />
        </p>
      </div>
    </footer>
  );
};

export default Footer;
