import React, { useState, useEffect, useRef } from 'react';
import { toast } from "sonner";
import { Copy, Check, Twitter, ExternalLink, HeartPulse } from 'lucide-react';
import { motion } from "framer-motion";

const Footer = () => {
  const [hasCopiedContract, setHasCopiedContract] = useState(false);
  const [hasCopiedSupport, setHasCopiedSupport] = useState(false);
  const contractAddress = "0xYourContractAddress"; // Replace with your actual contract address
  const supportEmail = "support@aibsurdity.com"; // Replace with your actual support email
  const quantumRef = useRef<HTMLDivElement>(null);
  const [glowColor, setGlowColor] = useState("text-neon-blue");

  const copyToClipboard = (text: string, type: 'contract' | 'support') => {
    navigator.clipboard.writeText(text)
      .then(() => {
        if (type === 'contract') {
          setHasCopiedContract(true);
          toast.success("Contract address copied to clipboard!");
          setTimeout(() => setHasCopiedContract(false), 2000);
        } else {
          setHasCopiedSupport(true);
          toast.success("Support email copied to clipboard!");
          setTimeout(() => setHasCopiedSupport(false), 2000);
        }
      })
      .catch((err) => {
        toast.error("Failed to copy: " + err.message);
        console.error("Failed to copy text: ", err);
      });
  };

  const handleQuoteClick = () => {
    setGlowColor(glowColor === "text-neon-blue" ? "text-neon-pink" : "text-neon-blue");
  };

  useEffect(() => {
    const handleMouseEnter = () => {
      setGlowColor("text-neon-green");
    };

    const handleMouseLeave = () => {
      setGlowColor("text-neon-blue");
    };

    const currentRef = quantumRef.current;
    if (currentRef) {
      currentRef.addEventListener("mouseenter", handleMouseEnter);
      currentRef.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("mouseenter", handleMouseEnter);
        currentRef.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <footer className="pt-12 pb-8 px-4 border-t border-white/10 luxury-divider relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Column 1: Logo & Description */}
          <div className="md:col-span-4">
            <div className="mb-6">
              <h3 className="text-2xl font-pixel text-neon-blue mb-2">AIbsurdity</h3>
              <p className="text-luxe text-sm text-gray-400 mb-4">
                The most absurd crypto project in the multiverse. Where AI meets blockchain and throws logic out the window.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Twitter size={18} className="text-neon-blue" />
                <a href="https://twitter.com/aibsurdity" className="text-sm text-gray-300 hover:text-neon-blue transition-colors">
                  @aibsurdity
                </a>
              </div>
              
              <div className="flex items-center space-x-2">
                <ExternalLink size={18} className="text-neon-pink" />
                <a href="https://aibsurdity.com" className="text-sm text-gray-300 hover:text-neon-pink transition-colors">
                  aibsurdity.com
                </a>
              </div>
            </div>
          </div>
          
          {/* Column 2: Key Links */}
          <div className="md:col-span-2">
            <h4 className="text-neon-green font-pixel mb-4 text-sm">Explore</h4>
            <ul className="space-y-2">
              <li>
                <a href="#roadmap" className="text-sm text-gray-300 hover:text-neon-green transition-colors premium-hover inline-block py-1">
                  Roadmap
                </a>
              </li>
              <li>
                <a href="#tokenomics" className="text-sm text-gray-300 hover:text-neon-green transition-colors premium-hover inline-block py-1">
                  Tokenomics
                </a>
              </li>
              <li>
                <a href="#whitepaper" className="text-sm text-gray-300 hover:text-neon-green transition-colors premium-hover inline-block py-1">
                  Whitepaper
                </a>
              </li>
              <li>
                <a href="#memes" className="text-sm text-gray-300 hover:text-neon-green transition-colors premium-hover inline-block py-1">
                  Meme Gallery
                </a>
              </li>
            </ul>
          </div>
          
          {/* Column 3: Contract & Links */}
          <div className="md:col-span-6">
            <h4 className="text-neon-yellow font-pixel mb-4 text-sm">Important Info</h4>
            
            {/* Contracts - Horizontally Aligned */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                <span className="text-xs text-gray-400 whitespace-nowrap mb-1 sm:mb-0">
                  Contract:
                </span>
                <div className="flex items-center space-x-2 flex-1 min-w-0">
                  <code className="text-xs text-neon-purple bg-black/30 px-2 py-1 rounded luxury-card truncate">
                    {contractAddress}
                  </code>
                  <button
                    onClick={() => copyToClipboard(contractAddress, 'contract')}
                    className="text-neon-yellow hover:text-neon-pink transition-colors"
                  >
                    {hasCopiedContract ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                <span className="text-xs text-gray-400 whitespace-nowrap mb-1 sm:mb-0">
                  Support:
                </span>
                <div className="flex items-center space-x-2 flex-1 min-w-0">
                  <code className="text-xs text-neon-green bg-black/30 px-2 py-1 rounded luxury-card truncate">
                    {supportEmail}
                  </code>
                  <button
                    onClick={() => copyToClipboard(supportEmail, 'support')}
                    className="text-neon-yellow hover:text-neon-pink transition-colors"
                  >
                    {hasCopiedSupport ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                </div>
              </div>
            </div>
            
            {/* Community & Socials */}
            <div className="mt-6">
              <h5 className="text-neon-orange font-pixel mb-3 text-xs">Join Our Community</h5>
              <div className="flex flex-wrap gap-2">
                <a 
                  href="#" 
                  className="inline-flex items-center space-x-1 text-xs px-3 py-1.5 rounded-full bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/30 transition-colors"
                >
                  <span>Discord</span>
                </a>
                <a 
                  href="#" 
                  className="inline-flex items-center space-x-1 text-xs px-3 py-1.5 rounded-full bg-neon-pink/20 text-neon-pink hover:bg-neon-pink/30 transition-colors"
                >
                  <span>Telegram</span>
                </a>
                <a 
                  href="#" 
                  className="inline-flex items-center space-x-1 text-xs px-3 py-1.5 rounded-full bg-neon-green/20 text-neon-green hover:bg-neon-green/30 transition-colors"
                >
                  <span>Medium</span>
                </a>
                <a 
                  href="#" 
                  className="inline-flex items-center space-x-1 text-xs px-3 py-1.5 rounded-full bg-neon-yellow/20 text-neon-yellow hover:bg-neon-yellow/30 transition-colors"
                >
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Animated neon-glowing quote with tiny font and smoother animation - with Easter Egg */}
        <div className="mt-8 text-center cursor-pointer" onClick={handleQuoteClick} ref={quantumRef}>
          <p 
            className={`font-pixel text-3xs md:text-2xs ${glowColor} transition-colors duration-3000 ease-in-out`}
            style={{ 
              textShadow: '0 0 3px currentColor, 0 0 5px currentColor',
              animation: 'neon-pulse 8s ease-in-out infinite'
            }}
          >
            "If we fail... We'll leave, but we'll slam the door so hard that the world will tremble!"
          </p>
        </div>
        
        {/* Updated copyright with made with love */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500 flex items-center justify-center space-x-1">
            <span>© 2023-2024 AIbsurdity. Made with</span>
            <HeartPulse size={12} className="text-neon-pink animate-pulse" />
            <span>and a broken algorithm.</span>
          </p>
        </div>
      </div>
      
      {/* Premium background effect */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neon-purple via-transparent to-transparent opacity-30"></div>
      </div>
    </footer>
  );
};

export default Footer;
