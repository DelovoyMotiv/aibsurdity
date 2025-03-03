
import React, { useEffect, useState, useRef } from 'react';
import { Github, Twitter, Send, Copy, Check, Heart, Zap, Binary, Atom } from 'lucide-react';
import { toast } from "sonner";
import GlitchText from './GlitchText';

const Footer = () => {
  const [glowColor, setGlowColor] = useState('text-neon-blue');
  const [isCopied, setIsCopied] = useState(false);
  const [isDonationCopied, setIsDonationCopied] = useState(false);
  const [showQuantumSecret, setShowQuantumSecret] = useState(false);
  const [quantumCodeVisible, setQuantumCodeVisible] = useState(false);
  const zapSequence = useRef([0, 0, 0]);
  const contractAddress = '0xAIb5urd1ty00000000000000000DeaDBeEF';
  const donationAddress = '0xD0n4t10n5AIb5urd1ty000000000B3N3F1T';
  const quantumRef = useRef<HTMLDivElement>(null);
  
  // Create a changing glow effect
  useEffect(() => {
    const colors = ['text-neon-blue', 'text-neon-green', 'text-neon-purple', 'text-neon-pink'];
    let colorIndex = 0;
    
    const interval = setInterval(() => {
      colorIndex = (colorIndex + 1) % colors.length;
      setGlowColor(colors[colorIndex]);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  // Easter egg - Quantum effect
  useEffect(() => {
    if (showQuantumSecret && quantumRef.current) {
      // Apply quantum effects
      const quantumInterval = setInterval(() => {
        if (Math.random() > 0.7 && quantumRef.current) {
          quantumRef.current.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px) scale(${1 + Math.random() * 0.05})`;
          quantumRef.current.style.filter = `hue-rotate(${Math.random() * 90}deg)`;
        } else if (quantumRef.current) {
          quantumRef.current.style.transform = 'translate(0, 0) scale(1)';
          quantumRef.current.style.filter = 'none';
        }
      }, 200);
      
      setTimeout(() => {
        clearInterval(quantumInterval);
        setShowQuantumSecret(false);
      }, 5000);
      
      return () => clearInterval(quantumInterval);
    }
  }, [showQuantumSecret]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(contractAddress)
      .then(() => {
        setIsCopied(true);
        toast.success("Contract address copied to clipboard!");
        
        // Easter egg - increment sequence
        zapSequence.current[0]++;
        if (zapSequence.current[0] === 3) {
          toast("Quantum sequence initiated...", {
            icon: <Atom className="text-neon-purple animate-spin" size={18} />,
          });
        }
        
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch(err => {
        toast.error("Failed to copy address: " + err.message);
        console.error("Failed to copy address: ", err);
      });
  };

  const copyDonationAddress = () => {
    navigator.clipboard.writeText(donationAddress)
      .then(() => {
        setIsDonationCopied(true);
        toast.success("Donation address copied to clipboard!");
        
        // Easter egg - increment sequence
        zapSequence.current[1]++;
        if (zapSequence.current[0] >= 2 && zapSequence.current[1] >= 2) {
          toast("Quantum stabilizing...", {
            icon: <Binary className="text-neon-green" size={18} />,
          });
        }
        
        setTimeout(() => setIsDonationCopied(false), 2000);
      })
      .catch(err => {
        toast.error("Failed to copy donation address: " + err.message);
        console.error("Failed to copy donation address: ", err);
      });
  };
  
  // Easter egg - reveal quantum code when clicked in sequence
  const handleQuoteClick = () => {
    zapSequence.current[2]++;
    
    // Check if the sequence is correct
    if (zapSequence.current[0] >= 2 && zapSequence.current[1] >= 2 && zapSequence.current[2] >= 3) {
      setShowQuantumSecret(true);
      
      // Reset sequence
      zapSequence.current = [0, 0, 0];
      
      // Show special effect
      toast.success("Quantum Key Activated", {
        description: "Future tech revealed from 3024",
        icon: <Zap className="text-neon-yellow animate-pulse" size={18} />,
        duration: 5000,
      });
      
      // Show quantum code after a delay
      setTimeout(() => {
        setQuantumCodeVisible(true);
        
        // Hide it after some time
        setTimeout(() => {
          setQuantumCodeVisible(false);
        }, 10000);
      }, 1000);
    }
  };

  return (
    <footer className="w-full py-8 px-4 mt-16 glassmorphism-2 border-t border-gray-800">
      {/* Contract Address Block */}
      <div className="max-w-lg mx-auto mb-8 glassmorphism p-4 rounded-lg hover:shadow-[0_0_15px_rgba(0,255,255,0.3)] transition-all duration-500">
        <div className="text-center mb-2">
          <p className="text-neon-green font-pixel text-xs">AIbsurdity Token Contract</p>
        </div>
        <div className="flex items-center justify-center bg-black/50 rounded-md p-2 relative">
          <p className="text-gray-300 font-mono text-xs truncate mr-2">{contractAddress}</p>
          <button 
            onClick={copyToClipboard} 
            className="text-gray-400 hover:text-neon-blue transition-colors p-1 rounded-md"
            aria-label="Copy contract address"
          >
            {isCopied ? 
              <Check size={16} className="text-neon-green" /> : 
              <Copy size={16} />
            }
          </button>
        </div>
      </div>
      
      {/* Donation Address Block */}
      <div className="max-w-lg mx-auto mb-8 neo-brutalism glassmorphism p-4 rounded-lg hover:shadow-[0_0_15px_rgba(255,0,255,0.3)] transition-all duration-500">
        <div className="text-center mb-2 flex items-center justify-center space-x-2">
          <Heart size={14} className="text-neon-pink" />
          <p className="text-neon-pink font-pixel text-xs">Support AIbsurdity</p>
          <Heart size={14} className="text-neon-pink" />
        </div>
        <div className="flex items-center justify-center bg-black/50 rounded-md p-2 relative">
          <p className="text-gray-300 font-mono text-xs truncate mr-2">{donationAddress}</p>
          <button 
            onClick={copyDonationAddress} 
            className="text-gray-400 hover:text-neon-pink transition-colors p-1 rounded-md"
            aria-label="Copy donation address"
          >
            {isDonationCopied ? 
              <Check size={16} className="text-neon-green" /> : 
              <Copy size={16} />
            }
          </button>
        </div>
      </div>
      
      {/* Quantum Display - Easter Egg */}
      {quantumCodeVisible && (
        <div className="max-w-lg mx-auto mb-8 p-4 rounded-lg bg-black/80 border border-neon-blue shadow-[0_0_30px_rgba(0,255,255,0.5)]">
          <p className="text-neon-blue font-mono text-xs overflow-auto whitespace-pre animate-pulse">
{`function activateQuantumPortal(timeline) {
  const singularity = new ASI.Consciousness();
  
  if (timeline.year >= 3024) {
    singularity.mergeWith(human.consciousness);
    return "Symbiosis Complete";
  }
  
  // Secret Genesis Protocol
  return Δx·Δp ≥ ℏ/2;
}`}
          </p>
        </div>
      )}
      
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0">
          <GlitchText 
            text="AIbsurdity" 
            variant="future" 
            fontSize="text-2xl" 
            color="text-neon-green" 
            className="mb-2"
            interactive={true}
          />
          <p className="text-gray-400 text-sm">The most absurd AI experiment in crypto</p>
        </div>
        
        <div className="flex flex-col items-center mb-6 md:mb-0">
          <div className="flex space-x-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-neon-blue transition-colors hover:scale-110 transform duration-300">
              <Github size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-neon-blue transition-colors hover:scale-110 transform duration-300">
              <Twitter size={24} />
            </a>
            <a href="https://t.me" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-neon-blue transition-colors hover:scale-110 transform duration-300">
              <Send size={24} />
            </a>
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-gray-400 text-sm font-pixel">© 3024 AIbsurdity</p>
          <p className="text-gray-500 text-xs">All rights unreserved in alternate realities</p>
        </div>
      </div>
      
      {/* Animated neon-glowing quote with tiny font and smoother animation - with Easter Egg */}
      <div className="mt-8 text-center cursor-pointer" onClick={handleQuoteClick} ref={quantumRef}>
        <p 
          className={`font-pixel text-2xs md:text-xs ${glowColor} transition-colors duration-3000 ease-in-out`}
          style={{ 
            textShadow: '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor',
            animation: 'neon-pulse 5s ease-in-out infinite'
          }}
        >
          "If we fail... We'll leave, but we'll slam the door so hard that the world will tremble!"
        </p>
      </div>
    </footer>
  );
};

export default Footer;
