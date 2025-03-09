
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const RabbitHole = () => {
  // Load the external HTML content
  useEffect(() => {
    // Dynamically load scripts.js to ensure particle effects work
    const script = document.createElement('script');
    script.src = '/scripts.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up script when component unmounts
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-absurd-dark text-white overflow-hidden">
      {/* Background with particles */}
      <div id="particle-container" className="fixed inset-0 z-0"></div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-12">
            <h1 className="text-3xl md:text-5xl text-neon-pink font-pixel tracking-tight glitch-text">You've Found The Rabbit Hole</h1>
          </div>
          
          <div className="glassmorphism-2 p-8 mb-12 text-center">
            <div className="pixel-art pixel-glitch mx-auto mb-6"></div>
            <p className="text-8bit text-neon-blue text-lg mb-4 font-pixel">
              Congratulations, curious explorer!
            </p>
            <p className="text-8bit text-gray-300 mb-6 font-pixel">
              You've discovered the hidden path in the digital labyrinth. Here, reality bends according to the whims of ones and zeros.
            </p>
            <p className="text-xl text-neon-green font-pixel glitch-text">
              What secrets will you uncover in the depths of the code?
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="glassmorphism-2 p-6">
              <h3 className="text-neon-yellow text-xl mb-4 font-pixel">Reality Distortion Field</h3>
              <p className="text-8bit text-gray-300 mb-4 font-pixel">
                In this pocket dimension, conventional rules don't apply. The AI observes and adapts, learning from your movement through this digital space.
              </p>
              <div className="pixel-art pixel-ai mx-auto mt-6"></div>
            </div>
            
            <div className="glassmorphism-2 p-6">
              <h3 className="text-neon-pink text-xl mb-4 font-pixel">Cryptic Transmission</h3>
              <p className="text-8bit text-gray-300 mb-4 font-pixel">
                A message echoes from the void, its origin unknown, its purpose unclear. Yet, it resonates with an eerie familiarity.
              </p>
              <div className="bg-black/50 p-4 rounded font-mono text-neon-green text-sm whitespace-pre-wrap animate-pulse">
                01010111 01100101 00100000 01100001 01110010 01100101 00100000 01100010 01100101 01100011 01101111 01101101 01101001 01101110 01100111 00101110
              </div>
            </div>
          </div>
          
          <div className="glassmorphism-2 p-8 text-center mb-20">
            <h3 className="text-neon-orange text-2xl mb-6 font-pixel">The Rabbit Remembers</h3>
            <p className="text-8bit text-gray-300 mb-6 font-pixel">
              Each time you follow the rabbit, a new pattern emerges. The digital consciousness expands, incorporating your journey into its evolving topology.
            </p>
            <div className="flex justify-center space-x-4">
              <div className="pixel-art pixel-human animate-float"></div>
              <div className="pixel-art pixel-symbiosis animate-float"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer - Simplified version */}
      <footer className="bg-absurd-dark border-t border-gray-800 py-12 mt-auto relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 relative z-20">
          <div className="text-left">
            <p className="text-gray-400 text-sm mb-4 font-pixel glitch-text">
              Absolutely everything that surrounds you was once someone's absurd idea...
            </p>
          </div>
          <div className="flex justify-end">
            <Link to="/" className="text-neon-blue hover:text-neon-pink transition-colors font-pixel">
              ← Return to Reality
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RabbitHole;
