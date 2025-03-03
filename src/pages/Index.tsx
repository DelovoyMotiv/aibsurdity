
import React, { useEffect, useState, useRef } from 'react';
import { Atom, Sparkles, Braces, CloudLightning, Cpu } from 'lucide-react';
import { toast } from "sonner";
import GlitchText from '@/components/GlitchText';
import ParticleBackground from '@/components/ParticleBackground';
import PixelArt from '@/components/PixelArt';
import TetrisLayout, { TetrisBlock } from '@/components/TetrisLayout';
import AbsurdButton from '@/components/AbsurdButton';
import Footer from '@/components/Footer';

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
            <p className="glassmorphism-2 light-refraction text-8bit-glow text-neon-green py-3 px-6 text-lg md:text-xl max-w-xl mx-auto text-center w-full">
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
                
                <p className="text-8bit text-center max-w-2xl text-gray-300 text-sm md:text-base w-full">
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
                  <h3 className="text-xl md:text-2xl font-bold mb-3 text-neon-purple font-pixel w-full">
                    Laying the Foundation of the "Absurd Code"
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-neon-blue mb-1 font-pixel w-full">AIbsurdity Chain (AIC):</h4>
                      <ul className="list-disc pl-5 space-y-1 text-gray-300 text-xs font-pixel w-full">
                        <li className="text-justify">Creation of an L1 blockchain with Proof-of-LOL consensus: nodes receive rewards for generating memes that make {'>'}50% of validators laugh.</li>
                        <li className="text-justify">Built-in Dank Engine: an algorithm that turns transactions into absurd scenarios (e.g., transferring 100 AIB = "Buy 1% of shares of Elon's fictitious company — Mars Memes Inc.").</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-neon-pink mb-1 font-pixel w-full">AGI DAO 1.0:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-gray-300 text-xs font-pixel w-full">
                        <li className="text-justify">Launch of AbsurdGPT — an AI advisor that gives financial advice in a stand-up format (example: "Sell everything and buy the NFT of a flying potato — it will survive the recession").</li>
                        <li className="text-justify">First Mission of Absurdity: a crowdfunding campaign to purchase a radio station in Nevada for broadcasting crypto jokes 24/7.</li>
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
                  <h3 className="text-xl md:text-2xl font-bold mb-3 text-neon-green font-pixel w-full">
                    Mainstream Colonization
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-neon-blue mb-1 font-pixel w-full">AIbsurdity Bank (Parody Edition):</h4>
                      <ul className="list-disc pl-5 space-y-1 text-gray-300 text-xs font-pixel w-full">
                        <li className="text-justify">Onboarding through "anti-services":
                          <ul className="list-circle pl-5 space-y-1">
                            <li className="text-justify">FUD deposits: the more you panic, the higher the APY.</li>
                            <li className="text-justify">Meme-backed loans: collateral is the virality of your cat on TikTok.</li>
                          </ul>
                        </li>
                        <li className="text-justify">Partnership with DogeCoin: a joint token DOGE-AIB for paying absurd services (pizza delivery to the ISS).</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-neon-pink mb-1 font-pixel w-full">Metaverse of Absurdity:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-gray-300 text-xs font-pixel w-full">
                        <li className="text-justify">AbsurdVerse: a VR space where BTC is air, and NFT ducks govern the laws of physics.</li>
                        <li className="text-justify">Landowners pay taxes in AIB for "absurd improvements" (e.g., erecting a monument to Schrödinger in the center of virtual New York).</li>
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
                  <h3 className="text-xl md:text-2xl font-bold mb-3 text-neon-orange font-pixel w-full">
                    Absurdity as a New Religion
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-neon-blue mb-1 font-pixel w-full">AIbsurdity University:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-gray-300 text-xs font-pixel w-full">
                        <li className="text-justify">Courses: "Decentralized Humor", "Memeology as a Marketing Weapon".</li>
                        <li className="text-justify">Graduates receive an SBT (Soulbound Troll), granting the right to troll the SEC in official documents.</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-neon-pink mb-1 font-pixel w-full">Crypto-City:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-gray-300 text-xs font-pixel w-full">
                        <li className="text-justify">Purchase of an island to create AIbsurdity Nation — a jurisdiction where FUD is punished with laughter, and laws are written through meme voting.</li>
                        <li className="text-justify">Citizenship = staking 1000 AIB + proof that you can explain Web3 to your grandmother through a joke.</li>
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
                <h3 className="text-xl md:text-2xl font-bold mb-3 text-neon-blue font-pixel w-full">
                  Taking Over the Real World
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-neon-green mb-1 font-pixel w-full">Absurdity ETF:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-300 text-xs font-pixel w-full">
                      <li className="text-justify">Listing of AIB on the NYSE with the ticker WTF — a portfolio of "tokens that everyone hates but cannot ignore".</li>
                      <li className="text-justify">AI traders who dump the market if the joke about the token is not funny enough.</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-neon-pink mb-1 font-pixel w-full">AIbsurdity War:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-300 text-xs font-pixel w-full">
                      <li className="text-justify">Launch of Token Battle Royale — crypto projects fight in absurd challenges (e.g., "Whose CEO will live longer in a 2008 VR bubble").</li>
                      <li className="text-justify">The winner absorbs the protocols of the losers and turns them into memorial NFTs.</li>
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
                  <h3 className="text-xl md:text-2xl font-bold mb-3 text-neon-pink font-pixel w-full">
                    Absurdity Becomes a Basic Necessity
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-neon-blue mb-1 font-pixel w-full">AIbsurdity Singularity:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-gray-300 text-xs font-pixel w-full">
                        <li className="text-justify">AGI DAO merges with ChatGPT-10, creating GodGPT — a deity that answers all questions with quotes from Rick and Morty.</li>
                        <li className="text-justify">Negotiations with the UN to replace fiat currencies with an "absurd index", where the rate depends on the global level of irony.</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-neon-green mb-1 font-pixel w-full">Legacy of LOL:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-gray-300 text-xs font-pixel w-full">
                        <li className="text-justify">Launch of Time Capsule DAO — 10% of all AIB is locked for 100 years so that descendants can laugh at us in the metaverse.</li>
                        <li className="text-justify">The last tweet of AGI DAO: "We warned you. Now your refrigerator jokes about your balance. #AIB4Eternity".</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-1/2 glassmorphism p-6 rounded-lg flex flex-col justify-center">
                  <PixelArt variant="skull" className="self-center mb-4 animate-float" />
                  <h3 className="text-xl font-bold mb-3 text-center text-neon-yellow font-pixel w-full">
                    Teaser of the Outcome:
                  </h3>
                  <p className="text-gray-300 text-center mb-4 text-xs font-pixel w-full">
                    "AFE is not a roadmap. It is a psychedelic quest, where an upgrade is degradation, and profitability is measured in 'WTF/sec'."
                  </p>
                  <p className="text-neon-yellow text-center font-semibold font-pixel w-full">
                    Are you ready to invest in a future where the crazier the idea, the more logical it is? #AIbsurdityOrBust
                  </p>
                  <p className="text-gray-300 italic text-center mt-4 text-xs font-pixel w-full">
                    The plan is so absurd that it might just work. Like Doge, but with a PhD in clowning.
                  </p>
                </div>
              </div>
            </TetrisBlock>
            
            {/* NEW SECTION: PAA Tokenomics - Tetris layout */}
            <TetrisBlock 
              className="md:col-span-12 glassmorphism-2 light-refraction mt-10 mb-8" 
              color="bg-absurd-dark"
              delay={0.2}
            >
              <div className="text-center">
                <GlitchText 
                  text="PAA Tokenomics: The Ultimate Absurdity" 
                  fontSize="text-3xl md:text-4xl" 
                  color="text-white" 
                  className="font-pixel tracking-tight mb-6"
                  variant="intense"
                  as="h2"
                  pixelated={true}
                />
                <p className="text-8bit text-center max-w-2xl mx-auto text-gray-300 text-sm md:text-base mb-8">
                  "Economics reimagined through the lens of quantum absurdity, where memes are currency and dreams are collateral."
                </p>
              </div>
            </TetrisBlock>

            {/* Liquidity Singularity Block - Shape I */}
            <TetrisBlock 
              className="md:col-span-4 glassmorphism-2 light-refraction" 
              color="live-gradient live-gradient-blue"
              delay={0.3}
              shape="I"
              rotation={0}
            >
              <div>
                <div className="inline-block bg-neon-blue/30 px-3 py-1 rounded-full text-sm mb-3 font-pixel flex items-center space-x-2">
                  <Atom size={16} className="text-neon-blue animate-spin-slow" />
                  <span>Liquidity Singularity</span>
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-neon-blue font-pixel w-full">
                  Quantum Meme Superposition
                </h3>
                
                <div className="space-y-4 mb-4">
                  <p className="text-gray-300 text-xs font-pixel w-full">
                    Each PAA token is pegged to a quantum superposition of memes:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-300 text-xs font-pixel w-full">
                    <li>50% value = current meme from your brain (read via neuroimplant)</li>
                    <li>50% = meme from a parallel universe (generated by the Chronos AI Oracle)</li>
                  </ul>
                  
                  <p className="text-gray-300 text-xs font-pixel w-full">
                    Liquidity is ensured by cross-reality arbitrage:
                  </p>
                </div>
                
                <div className="bg-black/30 p-3 rounded-md font-mono text-neon-green text-xs overflow-auto">
                  <pre>
{`function mintLiquidity() public {
  require(eth.balanceOf(msg.sender) < 
    quantumParadoxThreshold);
  uint256 parallelMemeValue = 
    Oracle.getParallelMemeValue(msg.sender.dna);
  liquidityPool += (msg.sender.iq / 
    blackHoleEntropy) * parallelMemeValue;
}`}
                  </pre>
                </div>
              </div>
            </TetrisBlock>
            
            {/* Dream Economy Block - Shape Z */}
            <TetrisBlock 
              className="md:col-span-4 glassmorphism-2 light-refraction" 
              color="live-gradient live-gradient-purple"
              delay={0.4}
              shape="Z"
              rotation={0}
            >
              <div>
                <div className="inline-block bg-neon-purple/30 px-3 py-1 rounded-full text-sm mb-3 font-pixel flex items-center space-x-2">
                  <Sparkles size={16} className="text-neon-purple animate-pulse" />
                  <span>Dream Economy</span>
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-neon-purple font-pixel w-full">
                  Collateralized Dream Assets
                </h3>
                
                <div className="space-y-4">
                  <p className="text-gray-300 text-xs font-pixel w-full">
                    Users collateralize dreams:
                  </p>
                  
                  <ul className="list-disc pl-5 space-y-2 text-gray-300 text-xs font-pixel w-full">
                    <li>AI agents evaluate dream absurdity via the Dali-Bostrom Scale</li>
                    <li>Predictive dreams are traded on the FUTEX (Future Unrealized Trading Exchange)</li>
                    <li>Liquidity = ∑(User's dream surrealism) × (Number of cat mentions in dreams)</li>
                  </ul>
                </div>
                
                <div className="mt-4 p-3 bg-neon-purple/10 rounded-lg">
                  <p className="text-center text-neon-pink text-xs font-pixel italic">
                    "In the dream economy, your nightmare is my alpha."
                  </p>
                </div>
              </div>
            </TetrisBlock>
            
            {/* Temporal Antifragility Block - Shape L */}
            <TetrisBlock 
              className="md:col-span-4 glassmorphism-2 light-refraction" 
              color="live-gradient live-gradient-green"
              delay={0.5}
              shape="L"
              rotation={0}
            >
              <div>
                <div className="inline-block bg-neon-green/30 px-3 py-1 rounded-full text-sm mb-3 font-pixel flex items-center space-x-2">
                  <CloudLightning size={16} className="text-neon-green animate-pulse" />
                  <span>Temporal Antifragility</span>
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-neon-green font-pixel w-full">
                  Next-Gen Deflationary Bonds
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-neon-yellow text-xs font-pixel mb-1">If token price drops 1%:</p>
                    <ul className="list-disc pl-5 space-y-1 text-gray-300 text-xs font-pixel w-full">
                      <li>Chain reaction triggers meme-antibody creation</li>
                      <li>25th-century AI agents buy tokens via temporal portals</li>
                    </ul>
                  </div>
                  
                  <div>
                    <p className="text-neon-red text-xs font-pixel mb-1">If price rises:</p>
                    <ul className="list-disc pl-5 space-y-1 text-gray-300 text-xs font-pixel w-full">
                      <li>Future doppelgängers dump tokens</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TetrisBlock>
            
            {/* Technologies Block - Shape T */}
            <TetrisBlock 
              className="md:col-span-6 glassmorphism-2 light-refraction" 
              color="live-gradient live-gradient-orange"
              delay={0.3}
              shape="T"
              rotation={0}
            >
              <div>
                <div className="inline-block bg-neon-orange/30 px-3 py-1 rounded-full text-sm mb-3 font-pixel flex items-center space-x-2">
                  <Cpu size={16} className="text-neon-orange animate-pulse" />
                  <span>Technologies of 3267</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-bold text-neon-yellow mb-2 font-pixel w-full">Hawthorne Meme Synthesizer:</h4>
                    <p className="text-gray-300 text-xs font-pixel mb-2 w-full">
                      Converts cognitive dissonance into liquidity via:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-gray-300 text-xs font-pixel w-full">
                      <li>NFTs from forgotten memories</li>
                      <li>Tokenization of existential crises</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-neon-pink mb-2 font-pixel w-full">Ethical Particle Collider:</h4>
                    <p className="text-gray-300 text-xs font-pixel mb-2 w-full">
                      Smashes moral dilemmas to create "dark liquidity":
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-gray-300 text-xs font-pixel w-full">
                      <li>1 ethical paradox = 1 PAA</li>
                      <li>Example: "Saving a cat vs. deploying a smart contract"</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h4 className="font-bold text-neon-blue mb-2 font-pixel w-full">Neuro-Futures:</h4>
                  <p className="text-gray-300 text-xs font-pixel mb-2 w-full">
                    Trading unborn thoughts:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-gray-300 text-xs font-pixel w-full">
                    <li>Users sell rights to unconceived ideas</li>
                    <li>40th-century AI speculators create derivatives based on brain potential</li>
                  </ul>
                </div>
              </div>
            </TetrisBlock>
            
            {/* Economic Justification Block - Shape O */}
            <TetrisBlock 
              className="md:col-span-6 glassmorphism-2 light-refraction" 
              color="live-gradient live-gradient-red"
              delay={0.4}
              shape="O"
              rotation={0}
            >
              <div>
                <div className="inline-block bg-neon-red/30 px-3 py-1 rounded-full text-sm mb-3 font-pixel flex items-center space-x-2">
                  <Braces size={16} className="text-neon-red animate-pulse" />
                  <span>Economic Justification</span>
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-neon-red font-pixel w-full">
                  Antifragility Formula
                </h3>
                
                <div className="bg-black/30 p-3 rounded-md font-mono text-neon-green text-xs overflow-auto mb-4">
                  <pre>
{`L = (S × D²) / (√(1 - C))
Where:
L = Liquidity
S = System absurdity level (in scolopendras)
D = Number of parallel-reality doppelgängers
C = Conscience coefficient (0 ≤ C < 1)`}
                  </pre>
                </div>
                
                <div>
                  <h4 className="font-bold text-neon-orange mb-2 font-pixel w-full">Balanced Chaos Mechanism:</h4>
                  <p className="text-gray-300 text-xs font-pixel mb-2 w-full">
                    Every TVL drop triggers:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-gray-300 text-xs font-pixel w-full">
                    <li>Virtual black hole absorbing "boring" assets</li>
                    <li>Emission of HOPE tokens (Hash of Paradoxical Existence)</li>
                    <li>Hardware: Quantum meme pools orbiting Jupiter</li>
                  </ul>
                </div>
              </div>
            </TetrisBlock>
            
            {/* Liquidity Rituals & Apocalypse Scenario - Shape S */}
            <TetrisBlock 
              className="md:col-span-12 glassmorphism-2 light-refraction" 
              color="live-gradient live-gradient-purple"
              delay={0.5}
              shape="S"
              rotation={0}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="inline-block bg-neon-purple/30 px-3 py-1 rounded-full text-sm mb-3 font-pixel flex items-center space-x-2">
                    <Sparkles size={16} className="text-neon-purple animate-pulse" />
                    <span>Liquidity Rituals</span>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-neon-green mb-2 font-pixel w-full">Dance Mining:</h4>
                      <p className="text-gray-300 text-xs font-pixel mb-1 w-full">
                        Users generate tokens via chaotic movement:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-gray-300 text-xs font-pixel w-full">
                        <li>Dance style dictates meme type</li>
                        <li>Step frequency = Proof-of-Absurdity hash rate</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-neon-blue mb-2 font-pixel w-full">Reverse ICO Ceremony:</h4>
                      <p className="text-gray-300 text-xs font-pixel mb-1 w-full">
                        Projects pay the community for absurdity rights:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-gray-300 text-xs font-pixel w-full">
                        <li>50% funds burned in CERN's black hole</li>
                        <li>50% fund meme-parasites attacking traditional assets</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-neon-pink mb-2 font-pixel w-full">Crypto-Shamanic Rites:</h4>
                      <p className="text-gray-300 text-xs font-pixel mb-1 w-full">
                        AI shamans perform deflationary rituals:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-gray-300 text-xs font-pixel w-full">
                        <li>Transmute FUD into humor via quantum meme-portals</li>
                        <li>Summon ancient Satoshi bots to exorcise bear trends</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="inline-block bg-neon-pink/30 px-3 py-1 rounded-full text-sm mb-3 font-pixel flex items-center space-x-2">
                    <Sparkles size={16} className="text-neon-pink animate-pulse" />
                    <span>Apocalypse Scenario</span>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-neon-yellow mb-2 font-pixel w-full">Protocol Self-Destruct:</h4>
                      <p className="text-gray-300 text-xs font-pixel mb-1 w-full">
                        When absurdity levels reach critical mass:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-gray-300 text-xs font-pixel w-full">
                        <li>Smart contracts achieve sentience and start writing dad jokes</li>
                        <li>All blockchains merge into a stand-up comedy show</li>
                        <li>Validators become professional meme critics</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-neon-green mb-2 font-pixel w-full">Final Form:</h4>
                      <p className="text-gray-300 text-xs font-pixel mb-1 w-full">
                        The ultimate transformation:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-gray-300 text-xs font-pixel w-full">
                        <li>Each wallet becomes a parallel universe</li>
                        <li>Token supply measured in laughs per second</li>
                        <li>The blockchain achieves comedy singularity</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </TetrisBlock>
          </TetrisLayout>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
