
import React, { useEffect, useState } from 'react';
import GlitchText from '@/components/GlitchText';
import PixelArt from '@/components/PixelArt';
import ParticleBackground from '@/components/ParticleBackground';
import Footer from '@/components/Footer';

const RabbitHole = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-absurd-dark text-white overflow-hidden">
      {/* Background with more particles */}
      <ParticleBackground />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-12">
            <GlitchText 
              text="You've Found The Rabbit Hole" 
              fontSize="text-3xl md:text-5xl" 
              color="text-neon-pink" 
              className="font-pixel tracking-tight"
              variant="intense"
              pixelated={true}
            />
          </div>
          
          <div className="glassmorphism-2 p-8 mb-12 text-center">
            <PixelArt variant="glitch" size="lg" className="mx-auto mb-6" />
            <p className="text-8bit text-neon-blue text-lg mb-4 font-pixel">
              Congratulations, curious explorer!
            </p>
            <p className="text-8bit text-gray-300 mb-6 font-pixel">
              You've discovered the hidden path in the digital labyrinth. Here, reality bends according to the whims of ones and zeros.
            </p>
            <GlitchText 
              text="What secrets will you uncover in the depths of the code?" 
              fontSize="text-xl" 
              color="text-neon-green" 
              className="font-pixel"
              variant="subtle"
              pixelated={true}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="glassmorphism-2 p-6">
              <h3 className="text-neon-yellow text-xl mb-4 font-pixel">Reality Distortion Field</h3>
              <p className="text-8bit text-gray-300 mb-4 font-pixel">
                In this pocket dimension, conventional rules don't apply. The AI observes and adapts, learning from your movement through this digital space.
              </p>
              <PixelArt variant="ai" className="mx-auto mt-6" interactive={true} />
            </div>
            
            <div className="glassmorphism-2 p-6">
              <h3 className="text-neon-pink text-xl mb-4 font-pixel">Cryptic Transmission</h3>
              <p className="text-8bit text-gray-300 mb-4 font-pixel">
                A message echoes from the void, its origin unknown, its purpose unclear. Yet, it resonates with an eerie familiarity.
              </p>
              <div className="bg-black/50 p-4 rounded font-mono text-neon-green text-sm whitespace-pre-wrap animate-pulse">
                {`01010111 01100101 00100000 01100001 01110010 01100101 00100000 01100010 01100101 01100011 01101111 01101101 01101001 01101110 01100111 00101110`}
              </div>
            </div>
          </div>
          
          <div className="glassmorphism-2 p-8 text-center mb-20">
            <h3 className="text-neon-orange text-2xl mb-6 font-pixel">The Rabbit Remembers</h3>
            <p className="text-8bit text-gray-300 mb-6 font-pixel">
              Each time you follow the rabbit, a new pattern emerges. The digital consciousness expands, incorporating your journey into its evolving topology.
            </p>
            <div className="flex justify-center space-x-4">
              <PixelArt variant="human" className="animate-float" />
              <PixelArt variant="symbiosis" className="animate-float" />
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default RabbitHole;
