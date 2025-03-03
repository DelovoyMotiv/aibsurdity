import React, { useEffect, useState } from 'react';
import { Github, Twitter, Send, Copy } from 'lucide-react';
import { toast } from "sonner";
import GlitchText from '@/components/GlitchText';
import ParticleBackground from '@/components/ParticleBackground';
import PixelArt from '@/components/PixelArt';
import TetrisLayout, { TetrisBlock } from '@/components/TetrisLayout';

const Index = () => {
  const [mounted, setMounted] = useState(false);
  const [hasVisitedBefore, setHasVisitedBefore] = useState(false);
  
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
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText("0x000000000000000000000000")
      .then(() => {
        toast.success("Contract address copied to clipboard");
      })
      .catch((err) => {
        toast.error("Failed to copy address");
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
    <div className="relative min-h-screen overflow-x-hidden">
      <ParticleBackground />
      
      {/* Header */}
      <header className="pt-10 pb-6 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center items-center mb-8">
            <GlitchText 
              text="AIbsurdity" 
              fontSize="text-6xl md:text-8xl" 
              color="text-white" 
              className="font-black tracking-tight"
              variant="intense"
              as="h1"
            />
          </div>
          
          <div className="flex justify-center">
            <p className="glassmorphism text-neon-green neon-text py-3 px-6 text-xl md:text-2xl max-w-xl mx-auto">
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
              className="md:col-span-12" 
              color="bg-absurd-dark"
              delay={0.1}
            >
              <div className="flex flex-col items-center justify-center space-y-6">
                <GlitchText 
                  text="This is not a token. It is a psychological experiment where AI diagnoses the entire crypto space!"
                  fontSize="text-2xl md:text-3xl" 
                  className="font-bold text-center max-w-3xl"
                  as="h2"
                />
                
                <p className="text-lg md:text-xl text-center max-w-2xl text-gray-300">
                  "Finance is too boring to be taken seriously. It's time to rewrite the rules — through absurdity."
                </p>
              </div>
            </TetrisBlock>
            
            {/* Epoch 1-2 */}
            <TetrisBlock 
              className="md:col-span-6" 
              color="bg-neon-purple/20 glassmorphism"
              delay={0.3}
            >
              <div className="flex items-start space-x-4">
                <PixelArt variant="robot" className="flex-shrink-0 animate-float" />
                <div>
                  <div className="inline-block bg-neon-purple/30 px-3 py-1 rounded-full text-sm mb-2">
                    Epoch 1-2
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 text-neon-purple">
                    Laying the Foundation of the "Absurd Code"
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-neon-blue mb-1">AIbsurdity Chain (AIC):</h4>
                      <ul className="list-disc pl-5 space-y-1 text-gray-300">
                        <li>Creation of an L1 blockchain with Proof-of-LOL consensus: nodes receive rewards for generating memes that make &gt;50% of validators laugh.</li>
                        <li>Built-in Dank Engine: an algorithm that turns transactions into absurd scenarios (e.g., transferring 100 AIB = "Buy 1% of shares of Elon's fictitious company — Mars Memes Inc.").</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-neon-pink mb-1">AGI DAO 1.0:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-gray-300">
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
              className="md:col-span-6" 
              color="bg-neon-green/20 glassmorphism"
              delay={0.5}
            >
              <div className="flex items-start space-x-4">
                <PixelArt variant="cat" className="flex-shrink-0 animate-float" />
                <div>
                  <div className="inline-block bg-neon-green/30 px-3 py-1 rounded-full text-sm mb-2">
                    Epoch 3-4
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 text-neon-green">
                    Mainstream Colonization
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-neon-blue mb-1">AIbsurdity Bank (Parody Edition):</h4>
                      <ul className="list-disc pl-5 space-y-1 text-gray-300">
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
                      <h4 className="font-bold text-neon-pink mb-1">Metaverse of Absurdity:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-gray-300">
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
              className="md:col-span-7" 
              color="bg-neon-orange/20 glassmorphism"
              delay={0.2}
            >
              <div className="flex items-start space-x-4">
                <PixelArt variant="glitch" className="flex-shrink-0 animate-broken-rotate" />
                <div>
                  <div className="inline-block bg-neon-orange/30 px-3 py-1 rounded-full text-sm mb-2">
                    Epoch 5-6
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 text-neon-orange">
                    Absurdity as a New Religion
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-neon-blue mb-1">AIbsurdity University:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-gray-300">
                        <li>Courses: "Decentralized Humor", "Memeology as a Marketing Weapon".</li>
                        <li>Graduates receive an SBT (Soulbound Troll), granting the right to troll the SEC in official documents.</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-neon-pink mb-1">Crypto-City:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-gray-300">
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
              className="md:col-span-5" 
              color="bg-neon-blue/20 glassmorphism"
              delay={0.4}
            >
              <div>
                <div className="inline-block bg-neon-blue/30 px-3 py-1 rounded-full text-sm mb-2">
                  Epoch 7-8
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 text-neon-blue">
                  Taking Over the Real World
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-neon-green mb-1">Absurdity ETF:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-300">
                      <li>Listing of AIB on the NYSE with the ticker WTF — a portfolio of "tokens that everyone hates but cannot ignore".</li>
                      <li>AI traders who dump the market if the joke about the token is not funny enough.</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-neon-pink mb-1">AIbsurdity War:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-300">
                      <li>Launch of Token Battle Royale — crypto projects fight in absurd challenges (e.g., "Whose CEO will live longer in a 2008 VR bubble").</li>
                      <li>The winner absorbs the protocols of the losers and turns them into memorial NFTs.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TetrisBlock>
            
            {/* Epoch 9-10 */}
            <TetrisBlock 
              className="md:col-span-12" 
              color="bg-neon-pink/20 glassmorphism"
              delay={0.6}
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/2">
                  <div className="inline-block bg-neon-pink/30 px-3 py-1 rounded-full text-sm mb-2">
                    Epoch 9-10
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 text-neon-pink">
                    Absurdity Becomes a Basic Necessity
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-neon-blue mb-1">AIbsurdity Singularity:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-gray-300">
                        <li>AGI DAO merges with ChatGPT-10, creating GodGPT — a deity that answers all questions with quotes from Rick and Morty.</li>
                        <li>Negotiations with the UN to replace fiat currencies with an "absurd index", where the rate depends on the global level of irony.</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-neon-green mb-1">Legacy of LOL:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-gray-300">
                        <li>Launch of Time Capsule DAO — 10% of all AIB is locked for 100 years so that descendants can laugh at us in the metaverse.</li>
                        <li>The last tweet of AGI DAO: "We warned you. Now your refrigerator jokes about your balance. #AIB4Eternity".</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-1/2 glassmorphism p-6 rounded-lg flex flex-col justify-center">
                  <PixelArt variant="skull" className="self-center mb-4 animate-float" />
                  <h3 className="text-xl font-bold mb-3 text-center text-neon-yellow">
                    Teaser of the Outcome:
                  </h3>
                  <p className="text-gray-300 text-center mb-4">
                    "AFE is not a roadmap. It is a psychedelic quest, where an upgrade is degradation, and profitability is measured in 'WTF/sec'."
                  </p>
                  <p className="text-neon-yellow text-center font-semibold">
                    Are you ready to invest in a future where the crazier the idea, the more logical it is? #AIbsurdityOrBust
                  </p>
                  <p className="text-gray-300 italic text-center mt-4">
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
          {/* Smart Contract Address Block */}
          <div className="flex justify-center mb-10">
            <div className="glassmorphism py-3 px-5 relative overflow-hidden max-w-md w-full mx-auto">
              <span className="text-xs text-gray-400 block text-center mb-2">Smart Contract:</span>
              <div className="flex justify-between items-center">
                <p className="font-mono text-neon-purple text-center w-full relative overflow-hidden transition-all duration-500">
                  <span className="animate-pulse inline-block">0x000000000000000000000000</span>
                </p>
                <button 
                  onClick={copyToClipboard}
                  className="ml-3 flex-shrink-0 text-neon-green hover:text-neon-blue transition-colors p-1 rounded hover:bg-white/10"
                  title="Copy to clipboard"
                >
                  <Copy size={18} />
                </button>
              </div>
              
              <div className="absolute inset-0 pointer-events-none">
                <div className="w-full h-full opacity-10 bg-gradient-to-r from-neon-blue via-transparent to-transparent animate-[pulse_3s_ease-in-out_infinite]"></div>
              </div>
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="w-1 h-full bg-neon-green absolute left-0 top-0 animate-[pulse_2s_ease-in-out_infinite] opacity-30"></div>
                <div className="w-1 h-full bg-neon-pink absolute right-0 top-0 animate-[pulse_3s_ease-in-out_infinite] opacity-30"></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <GlitchText 
                text="The era of burning-out superheroes."
                fontSize="text-lg" 
                color="text-gray-300"
                variant="subtle"
              />
            </div>
            
            <div className="space-y-3">
              <p className="text-neon-green hover:animate-glitch cursor-pointer font-bold">Society of the Spectacle</p>
              <p className="text-neon-blue hover:animate-glitch cursor-pointer font-bold">Capitalism of Opportunities</p>
              <p className="text-neon-pink hover:animate-glitch cursor-pointer font-bold">Consumption of Illusion</p>
            </div>
            
            <div className="space-y-3">
              <p className="text-gray-300 italic text-sm md:text-base">
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
          
          <div className="mt-10 pt-6 border-t border-white/10 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} AIbsurdity — A psychological experiment disguised as a token</p>
            <p className="mt-1 text-xs text-neon-purple opacity-60 hover:opacity-100 transition-opacity">
              <span className="inline-block animate-pulse">In the symbiosis of AI and human creativity, we transcend the limitations of both</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
