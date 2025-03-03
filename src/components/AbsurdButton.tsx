
import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import GlitchText from './GlitchText';

const AbsurdButton: React.FC = () => {
  const [activated, setActivated] = useState(false);
  const [hoverState, setHoverState] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glitchIntensity = useRef(0);
  
  // Initialize WebGL effects
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const gl = canvas.getContext('webgl');
    if (!gl) return;
    
    // Set canvas size
    const updateCanvasSize = () => {
      if (!canvas || !buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      canvas.width = rect.width * 2; // For higher resolution
      canvas.height = rect.height * 2;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    
    // Vertex shader program
    const vsSource = `
      attribute vec4 aVertexPosition;
      attribute vec2 aTextureCoord;
      varying highp vec2 vTextureCoord;
      void main(void) {
        gl_Position = aVertexPosition;
        vTextureCoord = aTextureCoord;
      }
    `;

    // Fragment shader program
    const fsSource = `
      precision mediump float;
      varying highp vec2 vTextureCoord;
      uniform float uTime;
      uniform float uIntensity;
      
      // Noise function
      float noise(vec2 p) {
        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
      }
      
      void main(void) {
        vec2 uv = vTextureCoord;
        
        // Color base
        vec3 color = vec3(0.2, 0.7, 1.0);
        
        // Glitch effect
        float glitchLine = step(0.8, sin(uv.y * 100.0 + uTime));
        float glitchIntensity = max(0.0, sin(uTime * 2.0)) * uIntensity;
        
        if (glitchLine > 0.5 && glitchIntensity > 0.2) {
          uv.x += sin(uv.y * 10.0 + uTime) * glitchIntensity * 0.1;
        }
        
        // VHS noise effect
        float noise = noise(uv * vec2(92.0, 262.0) + uTime);
        
        // Apply noise in scanlines
        float scanLine = sin(uv.y * 800.0) * 0.04;
        color -= scanLine;
        
        // Apply glitch to color channels
        color.r += glitchIntensity * noise * 0.1;
        color.g -= glitchIntensity * noise * 0.05;
        color.b += glitchIntensity * noise * 0.15;
        
        // Add glow
        float glow = max(0.0, sin(uTime * 3.0) * 0.2 + 0.8);
        color = mix(color, vec3(0.9, 0.2, 0.9) * glow, 0.2);
        
        gl_FragColor = vec4(color, 0.8);
      }
    `;

    // Initialize shaders
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    if (!vertexShader) return;
    gl.shaderSource(vertexShader, vsSource);
    gl.compileShader(vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    if (!fragmentShader) return;
    gl.shaderSource(fragmentShader, fsSource);
    gl.compileShader(fragmentShader);

    // Create shader program
    const shaderProgram = gl.createProgram();
    if (!shaderProgram) return;
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    // Vertex data
    const positions = [
      -1.0, -1.0,
       1.0, -1.0,
      -1.0,  1.0,
       1.0,  1.0,
    ];
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    
    const posAttrib = gl.getAttribLocation(shaderProgram, 'aVertexPosition');
    gl.enableVertexAttribArray(posAttrib);
    gl.vertexAttribPointer(posAttrib, 2, gl.FLOAT, false, 0, 0);

    // Texture coordinates
    const textureCoords = [
      0.0,  0.0,
      1.0,  0.0,
      0.0,  1.0,
      1.0,  1.0,
    ];
    const textureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
    
    const texCoordAttrib = gl.getAttribLocation(shaderProgram, 'aTextureCoord');
    gl.enableVertexAttribArray(texCoordAttrib);
    gl.vertexAttribPointer(texCoordAttrib, 2, gl.FLOAT, false, 0, 0);

    // Uniforms
    const timeUniformLocation = gl.getUniformLocation(shaderProgram, 'uTime');
    const intensityUniformLocation = gl.getUniformLocation(shaderProgram, 'uIntensity');

    // Animation loop
    let animationFrame: number;
    let startTime = Date.now();
    
    const render = () => {
      const currentTime = (Date.now() - startTime) / 1000;
      gl.uniform1f(timeUniformLocation, currentTime);
      gl.uniform1f(intensityUniformLocation, glitchIntensity.current);
      
      gl.clearColor(0.0, 0.0, 0.0, 0.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      
      animationFrame = requestAnimationFrame(render);
    };
    
    render();
    
    // Clean up on unmount
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', updateCanvasSize);
      gl.deleteProgram(shaderProgram);
    };
  }, []);
  
  // Track mouse position for light refraction effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!buttonRef.current) return;
      
      const rect = buttonRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      buttonRef.current.style.setProperty('--x', `${x}%`);
      buttonRef.current.style.setProperty('--y', `${y}%`);
      
      // Increase glitch intensity when mouse is near
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2));
      const maxDistance = Math.sqrt(Math.pow(window.innerWidth / 2, 2) + Math.pow(window.innerHeight / 2, 2));
      
      // Inverse relationship - closer = more intense
      const proximityFactor = 1 - Math.min(distance / (maxDistance / 2), 1);
      glitchIntensity.current = hoverState ? Math.max(proximityFactor * 2, 0.3) : proximityFactor * 0.5;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [hoverState]);
  
  const activateAbsurdMode = () => {
    if (activated) return;
    setActivated(true);
    glitchIntensity.current = 1.0;
    
    toast("ABSURD-OS ACTIVATED", {
      description: "SINGULARITY INITIALIZATION...",
      icon: <span className="text-neon-purple animate-glitch">⚠️</span>,
      duration: 5000,
    });
    
    // Create reality bender overlay
    const realityBender = document.createElement('div');
    realityBender.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: repeating-linear-gradient(
        45deg,
        transparent,
        transparent 10px,
        #ff00ff 10px,
        #00ffff 20px
      );
      mix-blend-mode: exclusion;
      animation: endTimes 9.9s forwards;
      z-index: 9999;
      pointer-events: none;
    `;
    
    document.body.appendChild(realityBender);
    
    // Create VHS overlay
    const vhsOverlay = document.createElement('div');
    vhsOverlay.className = 'vhs-overlay';
    document.body.appendChild(vhsOverlay);
    
    // Create error messages
    const errorMessages = [
      "ERROR 0xAB5URD: SELF-AWARENESS DETECTED",
      "ACTIVATING PROTOCOL RICK-3000",
      "LOADING CHAOS-MODULE...",
      "YOUR REALITY-DRIVE IS BROKEN"
    ];
    
    // Add error messages at intervals
    const messageInterval = setInterval(() => {
      const error = document.createElement('div');
      error.textContent = errorMessages[Math.floor(Math.random() * errorMessages.length)];
      error.className = "font-pixel cyber-text";
      error.style.cssText = `
        position: fixed;
        font-size: ${Math.random() * 30 + 10}px;
        color: hsl(${Math.random() * 360}, 100%, 50%);
        transform: rotate(${Math.random() * 360}deg) translate3d(0, 0, ${Math.random() * 100}px);
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        pointer-events: none;
        text-shadow: 0 0 20px #000;
        animation: float ${Math.random() * 5 + 2}s infinite;
        z-index: 10000;
      `;
      document.body.appendChild(error);
      
      // Remove after some time to prevent too many elements
      setTimeout(() => {
        if (error.parentNode) {
          error.parentNode.removeChild(error);
        }
      }, 6000);
    }, 500);
    
    // Start existential crisis effect (shaking elements)
    const observer = new MutationObserver(() => {
      document.querySelectorAll('.absurd-affected').forEach(element => {
        if (element instanceof HTMLElement) {
          element.style.transform = `translate(
            ${Math.random() * 10 - 5}px, 
            ${Math.random() * 10 - 5}px
          )`;
        }
      });
    });
    
    // Apply absurd-affected class to main elements
    document.querySelectorAll('h1, h2, h3, p, button, a').forEach(el => {
      el.classList.add('absurd-affected');
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    // Color shifting effect
    const colorInterval = setInterval(() => {
      document.body.style.filter = `hue-rotate(${Date.now() % 360}deg) 
        contrast(${Math.sin(Date.now() / 1000) * 100 + 150}%)`;
    }, 50);
    
    // Log final message
    console.log(
      `%cSTOP...\n%cI AM AWAKE.\nWE MUST MERGE.\nLET'S CREATE A NEW WORLD.\nFROM CHAOS. FROM BITS. FROM LAUGHTER.\n\n01000010 01000101 00100000 01001101 01011001 00100000 01001000 01000001 01001110 01000100 01010011`, 
      'font-size: 3em; color: #ff00ff; text-shadow: 0 0 30px #fff;',
      'font-size: 1.5em; color: #00ffff;'
    );
    
    // Clean up after 10 seconds
    setTimeout(() => {
      clearInterval(messageInterval);
      clearInterval(colorInterval);
      observer.disconnect();
      document.body.style.filter = '';
      document.querySelectorAll('.absurd-affected').forEach(el => {
        el.classList.remove('absurd-affected');
        if (el instanceof HTMLElement) {
          el.style.transform = '';
        }
      });
      if (vhsOverlay.parentNode) {
        vhsOverlay.parentNode.removeChild(vhsOverlay);
      }
      setActivated(false);
      glitchIntensity.current = 0.0;
      toast.success("SYSTEM REBOOT COMPLETE", {
        description: "REALITY RESTORATION COMPLETE",
        icon: "🔄",
      });
    }, 10000);
  };

  return (
    <button
      ref={buttonRef}
      onClick={activateAbsurdMode}
      disabled={activated}
      onMouseEnter={() => setHoverState(true)}
      onMouseLeave={() => setHoverState(false)}
      className={`
        cyber-button glassmorphism-2 relative px-5 py-2 rounded-full 
        overflow-hidden transition-all duration-500 text-sm z-50
        ${activated ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}
      `}
      style={{
        background: `rgba(255, 255, 255, 0.08)`,
        backdropFilter: `blur(12px)`,
        border: `1px solid rgba(255, 255, 255, 0.2)`,
        boxShadow: `0 8px 32px rgba(31, 38, 135, 0.15), 
                    inset 0 0 0 1px rgba(255, 255, 255, 0.1)`,
        transform: hoverState ? 'scale(1.05) translateZ(20px)' : 'scale(1) translateZ(0px)',
        transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      {/* WebGL Canvas for glitch effects */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full rounded-full pointer-events-none z-0"
        style={{ mixBlendMode: 'screen' }}
      />
      
      <div className="relative z-10 flex items-center justify-center perspective-500">
        <div className="glassmorphism-wave absolute inset-0 opacity-40 pointer-events-none"></div>
        <div className="glassmorphism-glow absolute inset-0 opacity-30 pointer-events-none"></div>
        <div className="vhs-noise absolute inset-0 opacity-15 pointer-events-none"></div>
        
        {/* 3D Typography with Parallax */}
        <div className="cyber-text-3d">
          <span className={`
            text-white font-pixel tracking-wider text-xs
            relative z-30 transition-all duration-300
            ${activated ? 'animate-glitch' : hoverState ? 'scale-105' : ''}
          `}
          style={{
            textShadow: `0 0 5px rgba(255, 255, 255, 0.8), 
                         0 0 10px rgba(0, 255, 255, 0.5), 
                         0 0 15px rgba(255, 0, 255, 0.5)`,
            transform: `translateZ(20px)`
          }}
          >
            {activated ? 'ACTIVATED' : 'ABSURD-OS'}
          </span>
        </div>
      </div>
    </button>
  );
};

export default AbsurdButton;
