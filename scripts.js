
// Set current year in the footer
document.addEventListener('DOMContentLoaded', function() {
  // Set current year
  const currentYearElement = document.getElementById('current-year');
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }
  
  // Initialize particle effect
  initParticleBackground();
  
  // Initialize glitch effects
  initRandomGlitches();
  
  // Add VHS effect animation
  initVHSEffect();
  
  // Initialize holographic effects
  initHolographicEffects();
  
  // Check if this is the first visit (on main page only)
  if (document.getElementById('main-logo')) {
    checkFirstVisit();
  }
});

// Copy to clipboard function
function copyToClipboard(text, type) {
  navigator.clipboard.writeText(text)
    .then(() => {
      if (type === 'contract') {
        document.getElementById('contract-copy-icon').textContent = '✓';
        showToast('Contract address copied!', 'success');
        setTimeout(() => {
          document.getElementById('contract-copy-icon').textContent = '⎘';
        }, 2000);
      } else {
        document.getElementById('wallet-copy-icon').textContent = '✓';
        showToast('Wallet address copied!', 'success');
        setTimeout(() => {
          document.getElementById('wallet-copy-icon').textContent = '⎘';
        }, 2000);
      }
    })
    .catch(err => {
      showToast('Failed to copy: ' + err.message, 'error');
    });
}

// Toast notification system
function showToast(message, type = 'info', duration = 3000) {
  const toastContainer = document.getElementById('toast-container');
  
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let icon = '🔔';
  if (type === 'success') icon = '✓';
  if (type === 'error') icon = '✕';
  
  toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <div class="toast-content">
      <div class="toast-title">${message}</div>
    </div>
  `;
  
  toastContainer.appendChild(toast);
  
  // Remove toast after duration
  setTimeout(() => {
    toast.style.animation = 'toast-slide-out 0.3s ease forwards';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, duration);
}

// Particle background effect
function initParticleBackground() {
  const container = document.getElementById('particle-container');
  if (!container) return;
  
  // Create particles
  const particleCount = Math.min(100, Math.floor(window.innerWidth / 10));
  
  for (let i = 0; i < particleCount; i++) {
    createParticle(container);
  }
}

function createParticle(container) {
  const particle = document.createElement('div');
  particle.className = 'particle';
  
  // Random size between 2px and 5px
  const size = Math.random() * 3 + 2;
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  
  // Random position
  const x = Math.random() * 100;
  const y = Math.random() * 100;
  particle.style.left = `${x}%`;
  particle.style.top = `${y}%`;
  
  // Random opacity
  particle.style.opacity = Math.random() * 0.5 + 0.1;
  
  // Random color (choose from neon palette)
  const colors = [
    'rgba(0, 170, 255, 0.8)',   // neon blue
    'rgba(255, 0, 170, 0.8)',   // neon pink
    'rgba(0, 255, 136, 0.8)',   // neon green
    'rgba(170, 0, 255, 0.8)',   // neon purple
    'rgba(255, 238, 0, 0.8)',   // neon yellow
  ];
  
  particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
  
  // Animation properties
  const duration = Math.random() * 50 + 20;
  const delay = Math.random() * 10;
  
  // Create keyframe animation
  particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
  
  container.appendChild(particle);
}

// Random glitch effects
function initRandomGlitches() {
  const glitchElements = document.querySelectorAll('.glitch-text');
  
  setInterval(() => {
    // Randomly activate glitch effect
    if (Math.random() > 0.7) {
      const randomElement = glitchElements[Math.floor(Math.random() * glitchElements.length)];
      if (randomElement) {
        randomElement.classList.add('animate-broken-glitch');
        setTimeout(() => {
          randomElement.classList.remove('animate-broken-glitch');
        }, 800 + Math.random() * 1200);
      }
    }
  }, 2000);
}

// VHS overlay effect
function initVHSEffect() {
  const vhsOverlay = document.getElementById('vhs-overlay');
  if (!vhsOverlay) return;
  
  setInterval(() => {
    vhsOverlay.style.opacity = (Math.random() * 0.3 + 0.1).toString();
    vhsOverlay.style.transform = `translateY(${Math.random() * 4 - 2}px)`;
  }, 2000);
  
  const quantumNoise = document.getElementById('quantum-noise');
  if (quantumNoise) {
    setInterval(() => {
      const hue = Math.floor(Math.random() * 360);
      quantumNoise.style.filter = `hue-rotate(${hue}deg)`;
      quantumNoise.style.opacity = (Math.random() * 0.2 + 0.05).toString();
    }, 2000);
  }
}

// Holographic effects
function initHolographicEffects() {
  const hologramOverlay = document.getElementById('hologram-overlay');
  if (!hologramOverlay) return;
  
  // Random clip path changes
  setInterval(() => {
    const clipAngle = Math.random() * 10;
    hologramOverlay.style.clipPath = `polygon(${clipAngle}% 0%, 100% 0%, ${100-clipAngle}% 100%, 0% 100%)`;
  }, 2000);
  
  // Mouse movement effect
  document.addEventListener('mousemove', (e) => {
    if (!hologramOverlay) return;
    
    const rect = hologramOverlay.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const offsetX = ((e.clientX - centerX) / window.innerWidth) * 20;
    const offsetY = ((e.clientY - centerY) / window.innerHeight) * 20;
    
    hologramOverlay.style.transform = `perspective(1000px) rotateX(${-offsetY}deg) rotateY(${offsetX}deg)`;
    
    // Update holographic gradient position
    const gradientX = 50 + offsetX * 2;
    const gradientY = 50 + offsetY * 2;
    hologramOverlay.style.backgroundPosition = `${gradientX}% ${gradientY}%`;
    
    // Apply effect to all light-refraction elements
    const refractionElements = document.querySelectorAll('.light-refraction');
    refractionElements.forEach(el => {
      const elRect = el.getBoundingClientRect();
      const elX = ((e.clientX - elRect.left) / elRect.width) * 100;
      const elY = ((e.clientY - elRect.top) / elRect.height) * 100;
      
      el.style.setProperty('--x', `${elX}%`);
      el.style.setProperty('--y', `${elY}%`);
    });
    
    // Apply gradient movement to live-gradient elements
    const gradientElements = document.querySelectorAll('.live-gradient');
    gradientElements.forEach(el => {
      const elRect = el.getBoundingClientRect();
      // Calculate distance from element center
      const centerX = elRect.left + elRect.width / 2;
      const centerY = elRect.top + elRect.height / 2;
      
      // Map mouse position to gradient position (invert for natural feeling)
      const gradientX = 100 - ((e.clientX - centerX) / window.innerWidth * 50 + 50);
      const gradientY = 100 - ((e.clientY - centerY) / window.innerHeight * 50 + 50);
      
      el.style.backgroundPosition = `${gradientX}% ${gradientY}%`;
    });
  });
}

// First visit check
function checkFirstVisit() {
  const hasVisited = localStorage.getItem('hasVisitedAbsurdity');
  if (!hasVisited) {
    localStorage.setItem('hasVisitedAbsurdity', 'true');
  } else {
    // Easter egg - occasionally shows a glitch message for returning visitors
    const glitchChance = Math.random();
    if (glitchChance > 0.7) {
      setTimeout(() => {
        showToast("I see you've been here before...", 'success');
      }, 5000);
    }
  }
}
