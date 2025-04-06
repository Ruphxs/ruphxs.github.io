// Matrix rain effect
document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('matrix');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  
  // Set canvas size to window size
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  resizeCanvas();
  
  // Handle window resize
  window.addEventListener('resize', resizeCanvas);
  
  // Handle orientation changes
  window.addEventListener('orientationchange', function() {
    setTimeout(resizeCanvas, 100);
  });
  
  // Matrix characters
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()*&^%';
  const charArray = chars.split('');
  const fontSize = 14;
  let columns = Math.ceil(canvas.width / fontSize);
  let drops = [];
  
  // Initialize drops
  function initializeMatrix() {
    columns = Math.ceil(canvas.width / fontSize);
    drops = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }
  }
  
  initializeMatrix();
  
  // Theme-specific matrix colors
  const themeColors = {
    default: ['#00ff00', '#00ff33', '#33ff00'],
    matrix: ['#00ff00', '#00ff33', '#33ff00', '#39ff14', '#7fff00'],
    cyberpunk: ['#ff00ff', '#ff00cc', '#cc00ff', '#ff3366', '#ff33ff', '#f700ff', '#d300ff', '#aa00ff', '#7700ff'],
    sunset: ['#ff6b6b', '#ff4500', '#ff8c00', '#ffa500', '#ff7f50', '#ff7518', '#ff5f1f', '#ff4d00', '#ff0000'],
    ocean: ['#00ffff', '#00ccff', '#1e90ff', '#0066ff', '#0033ff', '#00bfff', '#00ffee', '#00e5ff', '#00b8ff']
  };

  // Theme-specific drop speeds
  const themeSpeeds = {
    default: 1,
    matrix: 1.8,
    cyberpunk: 1.5,
    sunset: 1.7,
    ocean: 1.6
  };

  // Theme-specific shadow blur amount
  const themeBlur = {
    default: 15,
    matrix: 20,
    cyberpunk: 30,
    sunset: 28,
    ocean: 25
  };

  // Theme-specific density multiplier
  const themeDensity = {
    default: 1,
    matrix: 1.5, 
    cyberpunk: 1.5,
    sunset: 1.5,
    ocean: 1.5
  };
  
  // Theme-specific fade opacity (lower = more visible trails)
  const themeFade = {
    default: 0.03,
    matrix: 0.03,
    cyberpunk: 0.015,
    sunset: 0.02,
    ocean: 0.015
  };

  let currentThemeColors = themeColors.default;
  let currentSpeed = themeSpeeds.default;
  let currentBlur = themeBlur.default;
  let currentDensity = themeDensity.default;
  let currentFade = themeFade.default;
  
  // Create background
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Draw matrix
  function draw() {
    // Add semi-transparent black rectangle on top of previous frame
    ctx.fillStyle = `rgba(0, 0, 0, ${currentFade})`; // Use theme-specific fade value
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Set font for characters
    ctx.font = fontSize + 'px monospace';
    
    // Ensure proper density across all screen widths
    const columnSpacing = Math.max(fontSize, canvas.width / (drops.length * currentDensity));
    
    // Draw characters
    for (let i = 0; i < drops.length; i++) {
      // Get random character
      const text = charArray[Math.floor(Math.random() * charArray.length)];
      
      // Draw character
      const x = i * columnSpacing;
      const y = drops[i] * fontSize;
      
      // Use current theme colors with glow effect
      const color = currentThemeColors[Math.floor(Math.random() * currentThemeColors.length)];
      
      // Add pulsating glow effect
      const pulseAmount = Math.sin(Date.now() * 0.003) * 5;
      const adjustedBlur = currentBlur + pulseAmount;
      
      ctx.shadowBlur = adjustedBlur;
      ctx.shadowColor = color;
      ctx.fillStyle = color;
      
      // Draw the text with varying opacity for more dynamic effect
      const opacity = 0.8 + Math.random() * 0.2; // Increased base opacity
      ctx.globalAlpha = opacity;
      ctx.fillText(text, x, y);
      ctx.globalAlpha = 1.0;
      
      // Reset shadow
      ctx.shadowBlur = 0;
      
      // Reset drop if it's at the bottom of the screen or randomly
      if (y > canvas.height && Math.random() > 0.94) { // Increased chance to reset
        drops[i] = 0;
      }
      
      // Move drop down
      drops[i] += currentSpeed;
    }
    
    // Call draw again
    requestAnimationFrame(draw);
  }
  
  // Listen for theme changes
  document.addEventListener('themeChange', function(e) {
    const theme = e.detail.theme;
    if (theme && themeColors[theme]) {
      currentThemeColors = themeColors[theme];
      currentSpeed = themeSpeeds[theme] || themeSpeeds.default;
      currentBlur = themeBlur[theme] || themeBlur.default;
      currentDensity = themeDensity[theme] || themeDensity.default;
      currentFade = themeFade[theme] || themeFade.default;
      
      // Reinitialize with new density
      initializeMatrix();
    } else {
      // Reset to default
      currentThemeColors = themeColors.default;
      currentSpeed = themeSpeeds.default;
      currentBlur = themeBlur.default;
      currentDensity = themeDensity.default;
      currentFade = themeFade.default;
      
      // Reinitialize with default density
      initializeMatrix();
    }
  });
  
  // Start animation
  draw();
}); 