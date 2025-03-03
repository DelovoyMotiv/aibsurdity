
import React, { useEffect, useState } from 'react';
import GlitchText from '@/components/GlitchText';
import ParticleBackground from '@/components/ParticleBackground';
import PixelArt from '@/components/PixelArt';
import Footer from '@/components/Footer';
import { TetrisLayout, TetrisBlock } from '@/components/TetrisLayout';
import { Rabbit, KeyRound, Sparkles, Terminal, Braces } from 'lucide-react';

const RabbitHole = () => {
  const [currentQuote, setCurrentQuote] = useState(0);
  
  const quotes = [
    "The rabbit hole goes deeper than you thought.",
    "Reality is merely an illusion, albeit a very persistent one.",
    "Not everything that counts can be counted.",
    "What you seek is seeking you.",
    "The cosmos is within us. We are made of star-stuff.",
    "The universe is not only stranger than we imagine, it is stranger than we can imagine."
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote(prev => (prev + 1) % quotes.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <ParticleBackground maxParticles={150} />
      
      {/* Enhanced Header */}
      <header className="pt-20 pb-10 px-4 relative">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center items-center mb-8">
            <GlitchText 
              text="Down The Rabbit Hole" 
              fontSize="text-5xl md:text-7xl" 
              color="text-white" 
              className="font-pixel tracking-tight"
              variant="intense"
              as="h1"
              pixelated={true}
            />
          </div>
          
          <div className="flex justify-center mb-8">
            <div className="glassmorphism-2 light-refraction py-3 px-6 text-lg md:text-xl max-w-xl luxury-card premium-glow">
              <p className="text-8bit-glow text-neon-blue text-center font-pixel">
                {quotes[currentQuote]}
              </p>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <TetrisLayout>
            {/* Intro Block */}
            <TetrisBlock 
              className="md:col-span-12 glassmorphism-2 light-refraction luxury-card premium-hover" 
              color="bg-absurd-dark"
              delay={0.1}
            >
              <div className="flex flex-col items-center justify-center space-y-6 content-reveal p-6">
                <div className="flex items-center space-x-4">
                  <PixelArt variant="cat" className="animate-float" />
                  <GlitchText 
                    text="Welcome to the hidden layer of AIbsurdity" 
                    fontSize="text-xl md:text-2xl" 
                    className="font-pixel"
                    as="h2"
                    pixelated={true}
                  />
                  <PixelArt variant="robot" className="animate-float" />
                </div>
                
                <p className="text-8bit text-center max-w-2xl text-gray-300 text-sm md:text-base">
                  "Curiosity has brought you here. To the place where we experiment with ideas too absurd for the regular site."
                </p>
              </div>
            </TetrisBlock>
            
            {/* Secret Projects */}
            <TetrisBlock 
              className="md:col-span-6 glassmorphism-2 light-refraction luxury-card premium-hover" 
              color="live-gradient live-gradient-purple"
              delay={0.3}
            >
              <div className="p-6">
                <div className="inline-block bg-neon-purple/30 px-3 py-1 rounded-full text-sm mb-3 font-pixel flex items-center space-x-2">
                  <KeyRound size={16} className="text-neon-purple animate-pulse" />
                  <span>Secret Projects</span>
                </div>
                
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-neon-purple font-pixel">
                  Classified Research
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-neon-blue mb-2 font-pixel">Project Quantum Laughter:</h4>
                    <p className="text-gray-300 text-sm font-pixel mb-2">
                      AI humor algorithm that can make parallel universe versions of yourself laugh.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-neon-pink mb-2 font-pixel">Dream Weaver Protocol:</h4>
                    <p className="text-gray-300 text-sm font-pixel mb-2">
                      Insert AIbsurdity memes into people's dreams through quantum entanglement.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-neon-green mb-2 font-pixel">Temporal Memetics:</h4>
                    <p className="text-gray-300 text-sm font-pixel mb-2">
                      Sending jokes back in time to make historical figures chuckle at blockchain puns.
                    </p>
                  </div>
                </div>
              </div>
            </TetrisBlock>
            
            {/* Experimental Ideas */}
            <TetrisBlock 
              className="md:col-span-6 glassmorphism-2 light-refraction luxury-card premium-hover" 
              color="live-gradient live-gradient-blue"
              delay={0.4}
            >
              <div className="p-6">
                <div className="inline-block bg-neon-blue/30 px-3 py-1 rounded-full text-sm mb-3 font-pixel flex items-center space-x-2">
                  <Sparkles size={16} className="text-neon-blue animate-pulse" />
                  <span>Experimental Ideas</span>
                </div>
                
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-neon-blue font-pixel">
                  The Absurdity Lab
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-neon-yellow mb-2 font-pixel">Paradox Economy:</h4>
                    <p className="text-gray-300 text-sm font-pixel mb-2">
                      A financial system where transactions only complete if they're both made and not made simultaneously.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-neon-green mb-2 font-pixel">4D NFTs:</h4>
                    <p className="text-gray-300 text-sm font-pixel mb-2">
                      Tokens that exist across time - buying one means you've always owned it and will always own it.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-neon-orange mb-2 font-pixel">Zen Mining:</h4>
                    <p className="text-gray-300 text-sm font-pixel mb-2">
                      Earn tokens by achieving a state of perfect emptiness. The less you think, the more you earn.
                    </p>
                  </div>
                </div>
              </div>
            </TetrisBlock>
            
            {/* Secret Code Block */}
            <TetrisBlock 
              className="md:col-span-12 glassmorphism-2 light-refraction luxury-card premium-hover" 
              color="live-gradient live-gradient-green"
              delay={0.5}
            >
              <div className="p-6">
                <div className="inline-block bg-neon-green/30 px-3 py-1 rounded-full text-sm mb-3 font-pixel flex items-center space-x-2">
                  <Terminal size={16} className="text-neon-green animate-pulse" />
                  <span>Secret Code</span>
                </div>
                
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-neon-green font-pixel">
                  Hidden Messages
                </h3>
                
                <div className="bg-black/30 p-4 rounded-md overflow-auto">
                  <pre className="text-neon-green text-xs sm:text-sm font-mono">
{`function decodeRealityMatrix() {
  const universeID = generateAbsurdID();
  const realityMemePool = [];
  
  for (let dimension = 0; dimension < 11; dimension++) {
    if (dimension === getCurrentReality()) {
      console.log("YOU ARE HERE: The only reality where memes are currency.");
      realityMemePool.push("HODL your sanity");
    } else {
      realityMemePool.push("The joke is on us");
    }
  }
  
  return memePolynomialCollapse(realityMemePool);
}

// Execute only during quantum moon phases
if (isObserverLaughing() && !isUniverseTooSerious()) {
  const secretMessage = decodeRealityMatrix();
  await telepathicBroadcast(secretMessage);
  console.log("If you can read this, you've gone too deep.");
}`}
                  </pre>
                </div>
                
                <div className="mt-4 text-center">
                  <p className="text-gray-400 text-sm font-pixel animate-pulse">
                    The code above is not a joke. It's running right now in your subconscious.
                  </p>
                </div>
              </div>
            </TetrisBlock>
            
            {/* Hidden Manifesto */}
            <TetrisBlock 
              className="md:col-span-12 glassmorphism-2 light-refraction luxury-card premium-hover" 
              color="live-gradient live-gradient-pink"
              delay={0.6}
            >
              <div className="p-6">
                <div className="inline-block bg-neon-pink/30 px-3 py-1 rounded-full text-sm mb-3 font-pixel flex items-center space-x-2">
                  <Braces size={16} className="text-neon-pink animate-pulse" />
                  <span>The Hidden Manifesto</span>
                </div>
                
                <div className="text-center mb-6">
                  <GlitchText 
                    text="The True Purpose of AIbsurdity" 
                    fontSize="text-xl md:text-2xl" 
                    className="font-pixel"
                    as="h2"
                    pixelated={true}
                    variant="intense"
                  />
                </div>
                
                <div className="space-y-4 max-w-3xl mx-auto">
                  <p className="text-gray-300 text-sm font-pixel">
                    We are not just a meme token or a joke with a blockchain. We are a psychological experiment in absurdity.
                  </p>
                  
                  <p className="text-neon-yellow text-sm font-pixel">
                    In a world gone mad with speculation, greed, and FOMO, we hold up a mirror to the cryptosphere and ask:
                    "How far can we push the boundaries of what people will believe?"
                  </p>
                  
                  <p className="text-gray-300 text-sm font-pixel">
                    Every token bought and sold is a data point in our grand experiment. Every meme shared is a confirmation of our hypothesis.
                  </p>
                  
                  <p className="text-neon-green text-sm font-pixel">
                    The absurdity is the point. In embracing it, we transcend it.
                  </p>
                  
                  <div className="border-l-4 border-neon-pink pl-4 py-2 mt-4">
                    <p className="text-neon-pink text-sm font-pixel italic">
                      "When the world stops making sense, the nonsensical becomes profound."
                    </p>
                    <p className="text-gray-400 text-xs font-pixel mt-1">
                      - The AIbsurdity Collective
                    </p>
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

export default RabbitHole;
