
import React, { useEffect, useState, useRef } from 'react';
import { Github, Twitter, Send, Copy, Heart, Coffee, HandCoins, Briefcase } from 'lucide-react';
import { toast } from "sonner";
import GlitchText from '@/components/GlitchText';
import ParticleBackground from '@/components/ParticleBackground';
import PixelArt from '@/components/PixelArt';
import TetrisLayout, { TetrisBlock } from '@/components/TetrisLayout';
import AbsurdButton from '@/components/AbsurdButton';

const Index = () => {
  const [mounted, setMounted] = useState(false);
  const [hasVisitedBefore, setHasVisitedBefore] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const pageRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setMounted(true);
    
    // Check if this is the first visit
    const hasVisited = localStorage.getItem('hasVisitedAbsurdity');
    if (hasVisited) {
      setHasVisitedBefore(true);
    } else {
      localStorage.setItem('hasVisitedAbsurdity', 'true');
    }
    
    // Add scroll listener for broken animations
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = (scrollPosition / documentHeight) * 100;
      
      document.documentElement.style.setProperty('--scroll-percentage', scrollPercentage.toString());
    };
    
    // Handle mouse move for refraction effects
    const handleMouseMove = (e: MouseEvent) => {
      if (pageRef.current) {
        const rect = pageRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        setMousePosition({ x, y });
        
        // Update CSS variables for light refraction
        document.documentElement.style.setProperty('--mouse-x', `${x}px`);
        document.documentElement.style.setProperty('--mouse-y', `${y}px`);
        
        // Apply hover effect to elements with light-refraction class
        const elements = document.querySelectorAll('.light-refraction');
        elements.forEach(el => {
          const elRect = (el as HTMLElement).getBoundingClientRect();
          const elX = ((e.clientX - elRect.left) / elRect.width) * 100;
          const elY = ((e.clientY - elRect.top) / elRect.height) * 100;
          
          (el as HTMLElement).style.setProperty('--x', `${elX}%`);
          (el as HTMLElement).style.setProperty('--y', `${elY}%`);
        });
        
        // Apply gradient movement to live-gradient elements
        const gradientElements = document.querySelectorAll('.live-gradient');
        gradientElements.forEach(el => {
          const elRect = (el as HTMLElement).getBoundingClientRect();
          // Calculate distance from element center
          const centerX = elRect.left + elRect.width / 2;
          const centerY = elRect.top + elRect.height / 2;
          
          // Map mouse position to gradient position (invert for natural feeling)
          const gradientX = 100 - ((e.clientX - centerX) / window.innerWidth * 50 + 50);
          const gradientY = 100 - ((e.clientY - centerY) / window.innerHeight * 50 + 50);
          
          (el as HTMLElement).style.backgroundPosition = `${gradientX}% ${gradientY}%`;
        });
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const copyToClipboard = (text: string, message: string) => {
    // Fix: Add error handling and make sure the Clipboard API is available
    if (!navigator.clipboard) {
      toast.error("Clipboard API not available in your browser");
      return;
    }
    
    navigator.clipboard.writeText(text)
      .then(() => {
        toast.success(message);
      })
      .catch((err) => {
        toast.error("Failed to copy: " + err.message);
        console.error("Failed to copy text: ", err);
      });
  };
  
  // Easter egg - occasionally shows a glitch in the welcome message
  useEffect(() => {
    if (!hasVisitedBefore) return;
    
    const glitchChance = Math.random();
    if (glitchChance > 0.7) {
      setTimeout(() => {
        toast("I see you've been here before...", {
          description: "The AI remembers your previous visits",
          icon: <span className="text-neon-purple animate-pulse">👁️</span>,
        });
      }, 5000);
    }
  }, [hasVisitedBefore]);
  
  if (!mounted) return null;
  
  return (
    <div ref={pageRef} className="relative min-h-screen overflow-x-hidden">
      <ParticleBackground />
      
      {/* AbsurdOS Button - Repositioned to top right */}
      <div className="fixed top-4 right-4 z-50">
        <AbsurdButton />
      </div>
      
      {/* Header */}
      <header className="pt-10 pb-6 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center items-center mb-8">
            <GlitchText 
              text="AIbsurdity" 
              fontSize="text-5xl md:text-7xl" 
              color="text-white" 
              className="font-pixel tracking-tight"
              variant="intense"
              as="h1"
              pixelated={true}
            />
          </div>
          
          <div className="flex justify-center">
            <p className="glassmorphism-2 light-refraction text-8bit-glow text-neon-green py-3 px-6 text-lg md:text-xl max-w-xl mx-auto">
              "I'm broken, but it's a feature."
            </p>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <TetrisLayout>
            {/* Intro Block */}
            <TetrisBlock 
              className="md:col-span-12 glassmorphism-2 light-refraction" 
              color="bg-absurd-dark"
              delay={0.1}
            >
              <div className="flex flex-col items-center justify-center space-y-6">
                <GlitchText 
                  text="This is not a token. It is a psychological experiment where AI diagnoses the entire crypto space!"
                  fontSize="text-xl md:text-2xl" 
                  className="font-pixel text-center max-w-3xl"
                  as="h2"
                  pixelated={true}
                />
                
                <p className="text-8bit text-center max-w-2xl text-gray-300 text-sm md:text-base">
                  "Finance is too boring to be taken seriously. It's time to rewrite the rules — through absurdity."
                </p>
              </div>
            </TetrisBlock>
            
            {/* Epoch 1-2 */}
            <TetrisBlock 
              className="md:col-span-6 glassmorphism-2 light-refraction" 
              color="live-gradient live-gradient-purple"
              delay={0.3}
            >
              <div className="flex items-start space-x-4">
                <PixelArt variant="robot" className="flex-shrink-0 animate-float" />
                <div>
                  <div className="inline-block bg-neon-purple/30 px-3 py-1 rounded-full text-sm mb-2 font-pixel">
                    Epoch 1-2
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 text-neon-purple font-pixel">
                    Laying the Foundation of the "Absurd Code"
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-neon-blue mb-1 font-pixel">AIbsurdity Chain (AIC):</h4>
                      <ul className="list-disc pl-5 space-y-1 text-gray-300 text-xs font-pixel">
                        <li>Creation of an L1 blockchain with Proof-of-LOL consensus: nodes receive rewards for generating memes that make &gt;50% of validators laugh.</li>
                        <li>Built-in Dank Engine: an algorithm that turns transactions into absurd scenarios (e.g., transferring 100 AIB = "Buy 1% of shares of Elon's fictitious company — Mars Memes Inc.").</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-neon-pink mb-1 font-pixel">AGI DAO 1.0:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-gray-300 text-xs font-pixel">
                        <li>Launch of AbsurdGPT — an AI advisor that gives financial advice in a stand-up format (example: "Sell everything and buy the NFT of a flying potato — it will survive the recession").</li>
                        <li>First Mission of Absurdity: a crowdfunding campaign to purchase a radio station in Nevada for broadcasting crypto jokes 24/7.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </TetrisBlock>
            
            {/* Epoch 3-4 */}
            <TetrisBlock 
              className="md:col-span-6 glassmorphism-2 light-refraction" 
              color="live-gradient live-gradient-green"
              delay={0.5}
            >
              <div className="flex items-start space-x-4">
                <PixelArt variant="cat" className="flex-shrink-0 animate-float" />
                <div>
                  <div className="inline-block bg-neon-green/30 px-3 py-1 rounded-full text-sm mb-2 font-pixel">
                    Epoch 3-4
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 text-neon-green font-pixel">
                    Mainstream Colonization
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-neon-blue mb-1 font-pixel">AIbsurdity Bank (Parody Edition):</h4>
                      <ul className="list-disc pl-5 space-y-1 text-gray-300 text-xs font-pixel">
                        <li>Onboarding through "anti-services":
                          <ul className="list-circle pl-5 space-y-1">
                            <li>FUD deposits: the more you panic, the higher the APY.</li>
                            <li>Meme-backed loans: collateral is the virality of your cat on TikTok.</li>
                          </ul>
                        </li>
                        <li>Partnership with DogeCoin: a joint token DOGE-AIB for paying absurd services (pizza delivery to the ISS).</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-neon-pink mb-1 font-pixel">Metaverse of Absurdity:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-gray-300 text-xs font-pixel">
                        <li>AbsurdVerse: a VR space where BTC is air, and NFT ducks govern the laws of physics.</li>
                        <li>Landowners pay taxes in AIB for "absurd improvements" (e.g., erecting a monument to Schrödinger in the center of virtual New York).</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </TetrisBlock>
            
            {/* Epoch 5-6 */}
            <TetrisBlock 
              className="md:col-span-7 glassmorphism-2 light-refraction" 
              color="live-gradient live-gradient-blue"
              delay={0.2}
            >
              <div className="flex items-start space-x-4">
                <PixelArt variant="glitch" className="flex-shrink-0 animate-broken-rotate" />
                <div>
                  <div className="inline-block bg-neon-orange/30 px-3 py-1 rounded-full text-sm mb-2 font-pixel">
                    Epoch 5-6
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 text-neon-orange font-pixel">
                    Absurdity as a New Religion
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-neon-blue mb-1 font-pixel">AIbsurdity University:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-gray-300 text-xs font-pixel">
                        <li>Courses: "Decentralized Humor", "Memeology as a Marketing Weapon".</li>
                        <li>Graduates receive an SBT (Soulbound Troll), granting the right to troll the SEC in official documents.</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-neon-pink mb-1 font-pixel">Crypto-City:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-gray-300 text-xs font-pixel">
                        <li>Purchase of an island to create AIbsurdity Nation — a jurisdiction where FUD is punished with laughter, and laws are written through meme voting.</li>
                        <li>Citizenship = staking 1000 AIB + proof that you can explain Web3 to your grandmother through a joke.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </TetrisBlock>
            
            {/* Epoch 7-8 */}
            <TetrisBlock 
              className="md:col-span-5 glassmorphism-2 light-refraction" 
              color="live-gradient live-gradient-blue"
              delay={0.4}
            >
              <div>
                <div className="inline-block bg-neon-blue/30 px-3 py-1 rounded-full text-sm mb-2 font-pixel">
                  Epoch 7-8
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 text-neon-blue font-pixel">
                  Taking Over the Real World
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-neon-green mb-1 font-pixel">Absurdity ETF:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-300 text-xs font-pixel">
                      <li>Listing of AIB on the NYSE with the ticker WTF — a portfolio of "tokens that everyone hates but cannot ignore".</li>
                      <li>AI traders who dump the market if the joke about the token is not funny enough.</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-neon-pink mb-1 font-pixel">AIbsurdity War:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-300 text-xs font-pixel">
                      <li>Launch of Token Battle Royale — crypto projects fight in absurd challenges (e.g., "Whose CEO will live longer in a 2008 VR bubble").</li>
                      <li>The winner absorbs the protocols of the losers and turns them into memorial NFTs.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TetrisBlock>
            
            {/* Epoch 9-10 */}
            <TetrisBlock 
              className="md:col-span-12 glassmorphism-2 light-refraction" 
              color="live-gradient live-gradient-pink"
              delay={0.6}
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/2">
                  <div className="inline-block bg-neon-pink/30 px-3 py-1 rounded-full text-sm mb-2 font-pixel">
                    Epoch 9-10
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 text-neon-pink font-pixel">
                    Absurdity Becomes a Basic Necessity
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-neon-blue mb-1 font-pixel">AIbsurdity Singularity:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-gray-300 text-xs font-pixel">
                        <li>AGI DAO merges with ChatGPT-10, creating GodGPT — a deity that answers all questions with quotes from Rick and Morty.</li>
                        <li>Negotiations with the UN to replace fiat currencies with an "absurd index", where the rate depends on the global level of irony.</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-neon-green mb-1 font-pixel">Legacy of LOL:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-gray-300 text-xs font-pixel">
                        <li>Launch of Time Capsule DAO — 10% of all AIB is locked for 100 years so that descendants can laugh at us in the metaverse.</li>
                        <li>The last tweet of AGI DAO: "We warned you. Now your refrigerator jokes about your balance. #AIB4Eternity".</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-1/2 glassmorphism p-6 rounded-lg flex flex-col justify-center">
                  <PixelArt variant="skull" className="self-center mb-4 animate-float" />
                  <h3 className="text-xl font-bold mb-3 text-center text-neon-yellow font-pixel">
                    Teaser of the Outcome:
                  </h3>
                  <p className="text-gray-300 text-center mb-4 text-xs font-pixel">
                    "AFE is not a roadmap. It is a psychedelic quest, where an upgrade is degradation, and profitability is measured in 'WTF/sec'."
                  </p>
                  <p className="text-neon-yellow text-center font-semibold font-pixel">
                    Are you ready to invest in a future where the crazier the idea, the more logical it is? #AIbsurdityOrBust
                  </p>
                  <p className="text-gray-300 italic text-center mt-4 text-xs font-pixel">
                    The plan is so absurd that it might just work. Like Doge, but with a PhD in clowning.
                  </p>
                </div>
              </div>
            </TetrisBlock>
          </TetrisLayout>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="py-10 px-4 bg-black/60 backdrop-blur-xl border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          {/* Contract and Fund Blocks - Horizontal Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* Smart Contract Block */}
            <div className="glassmorphism-2 light-refraction py-4 px-5 relative overflow-hidden h-full">
              <div className="flex justify-center mb-2">
                <div className="bg-neon-purple/30 px-3 py-1 rounded-full text-xs mb-1 flex items-center space-x-2 font-pixel">
                  <Copy size={14} className="text-neon-purple animate-pulse" />
                  <span>Smart Contract</span>
                </div>
              </div>
              
              <h3 className="text-center text-neon-purple mb-3 font-pixel text-sm">Contract Address</h3>
              
              <div className="flex justify-between items-center bg-black/30 rounded-lg p-2 mb-3">
                <p className="font-mono text-neon-purple text-xs md:text-sm text-center w-full relative overflow-hidden">
                  <span className="inline-block animate-pulse">0x000000000000000000000000</span>
                </p>
                <button 
                  onClick={() => copyToClipboard("0x000000000000000000000000", "Contract address copied to clipboard")}
                  className="ml-3 flex-shrink-0 text-neon-green hover:text-neon-blue transition-colors p-1 rounded hover:bg-white/10"
                  title="Copy contract address"
                  aria-label="Copy contract address"
                >
                  <Copy size={18} />
                </button>
              </div>
              
              <p className="text-center text-gray-300 text-xs font-pixel">Verified on Etherscan</p>
              
              <div className="absolute inset-0 pointer-events-none">
                <div className="w-full h-full opacity-10 bg-gradient-to-r from-neon-purple via-transparent to-neon-purple/30 animate-[pulse_5s_ease-in-out_infinite]"></div>
              </div>
            </div>

            {/* Hedge Fund Block */}
            <div className="glassmorphism-2 light-refraction py-4 px-5 relative overflow-hidden h-full">
              <div className="flex justify-center mb-2">
                <div className="bg-neon-blue/30 px-3 py-1 rounded-full text-xs mb-1 flex items-center space-x-2 font-pixel">
                  <Briefcase size={14} className="text-neon-blue animate-pulse" />
                  <span>Hedge Fund of Common Sense</span>
                </div>
              </div>
              
              <h3 className="text-center text-neon-blue mb-3 font-pixel text-sm">Fund Address</h3>
              
              <div className="flex justify-between items-center bg-black/30 rounded-lg p-2 mb-3">
                <p className="font-mono text-neon-blue text-xs md:text-sm text-center w-full relative overflow-hidden">
                  <span className="inline-block animate-pulse">0x1111111111111111111111111</span>
                </p>
                <button 
                  onClick={() => copyToClipboard("0x1111111111111111111111111", "Hedge Fund address copied to clipboard")}
                  className="ml-3 flex-shrink-0 text-neon-green hover:text-neon-blue transition-colors p-1 rounded hover:bg-white/10"
                  title="Copy fund address"
                  aria-label="Copy hedge fund address"
                >
                  <Copy size={18} />
                </button>
              </div>
              
              <p className="text-center text-gray-300 text-xs font-pixel">Managing absurd assets since 2023</p>
              
              <div className="absolute inset-0 pointer-events-none">
                <div className="w-full h-full opacity-10 bg-gradient-to-r from-neon-blue via-transparent to-neon-blue/30 animate-[pulse_5s_ease-in-out_infinite]"></div>
              </div>
            </div>

            {/* Donation Block */}
            <div className="glassmorphism-2 light-refraction py-4 px-5 relative overflow-hidden h-full">
              <div className="flex justify-center mb-2">
                <div className="bg-neon-pink/30 px-3 py-1 rounded-full text-xs mb-1 flex items-center space-x-2 font-pixel">
                  <Heart size={14} className="text-neon-pink animate-pulse" />
                  <span>Support the Absurdity</span>
                </div>
              </div>
              
              <h3 className="text-center text-neon-green mb-3 font-pixel text-sm">Donation Address</h3>
              
              <div className="flex justify-between items-center bg-black/30 rounded-lg p-2 mb-3">
                <p className="font-mono text-neon-pink text-xs md:text-sm text-center w-full relative overflow-hidden">
                  <span className="inline-block animate-pulse">0xooooooooooooooooooooooooooooooooooo</span>
                </p>
                <button 
                  onClick={() => copyToClipboard("0xooooooooooooooooooooooooooooooooooo", "Donation address copied to clipboard")}
                  className="ml-3 flex-shrink-0 text-neon-green hover:text-neon-blue transition-colors p-1 rounded hover:bg-white/10"
                  title="Copy donation address"
                  aria-label="Copy donation address"
                >
                  <Copy size={18} />
                </button>
              </div>
              
              <p className="text-center text-gray-300 text-xs font-pixel">Your support helps us create more absurdity!</p>
              
              <div className="flex justify-center space-x-4 mt-3">
                <div className="p-2 bg-neon-purple/20 rounded-full hover:bg-neon-purple/40 transition-colors cursor-pointer">
                  <Coffee size={16} className="text-neon-pink" />
                </div>
                <div className="p-2 bg-neon-green/20 rounded-full hover:bg-neon-green/40 transition-colors cursor-pointer">
                  <HandCoins size={16} className="text-neon-green" />
                </div>
                <div className="p-2 bg-neon-blue/20 rounded-full hover:bg-neon-blue/40 transition-colors cursor-pointer">
                  <Heart size={16} className="text-neon-blue" />
                </div>
              </div>
              
              <div className="absolute inset-0 pointer-events-none">
                <div className="w-full h-full opacity-10 bg-gradient-to-r from-neon-pink via-transparent to-neon-green/30 animate-[pulse_5s_ease-in-out_infinite]"></div>
              </div>
            </div>
          </div>

          {/* Rest of the footer content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <GlitchText 
                text="The era of burning-out superheroes."
                fontSize="text-sm" 
                color="text-gray-300"
                variant="pixel"
                pixelated={true}
              />
            </div>
            
            <div className="space-y-3">
              <p className="text-neon-green hover:animate-glitch cursor-pointer font-pixel text-xs">Society of the Spectacle</p>
              <p className="text-neon-blue hover:animate-glitch cursor-pointer font-pixel text-xs">Capitalism of Opportunities</p>
              <p className="text-neon-pink hover:animate-glitch cursor-pointer font-pixel text-xs">Consumption of Illusion</p>
            </div>
            
            <div className="space-y-3">
              <p className="text-gray-300 italic text-xs font-pixel">
                If nothing works out for us... We will leave, but as a farewell, we will slam the door so hard that the world will shudder!
              </p>
              
              <div className="flex space-x-6 mt-4">
                <a href="#" className="text-neon-blue hover:scale-110 transition-transform">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#" className="text-neon-green hover:scale-110 transition-transform">
                  <Send className="w-6 h-6" />
                </a>
                <a href="#" className="text-neon-purple hover:scale-110 transition-transform">
                  <Github className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-10 pt-6 border-t border-white/10 text-center text-gray-500 text-xs font-pixel">
            <p>© {new Date().getFullYear()} AIbsurdity — A psychological experiment disguised as a token</p>
            <p className="mt-1 text-xs text-neon-purple opacity-60 hover:opacity-100 transition-opacity">
              <span className="inline-block animate-pixel-flicker">In the symbiosis of AI and human creativity, we transcend the limitations of both</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
