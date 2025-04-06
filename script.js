document.addEventListener('DOMContentLoaded', () => {
  // Matrix rain effect
  const canvas = document.getElementById('matrix');
  const ctx = canvas.getContext('2d');

  // Set canvas size to window size
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Matrix characters
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()*&^%';
  const charArray = chars.split('');
  const fontSize = 14;
  const matrixColumns = canvas.width / fontSize;
  const drops = [];

  // Initialize drops with random positions
  for (let i = 0; i < matrixColumns; i++) {
    drops[i] = Math.random() * -100;
  }

  // Theme-specific matrix colors
  const themeColors = {
    default: ['#00ff00'],
    matrix: ['#00ff00', '#00cc00', '#009900', '#00ff33', '#33ff00'],
    cyberpunk: ['#ff00ff', '#00ffff', '#ff3366', '#3366ff', '#ff69b4', '#00ffcc'],
    sunset: ['#ff6b6b', '#ffd93d', '#ff9999', '#ffac81', '#ff5e78'],
    ocean: ['#189AB4', '#75E6DA', '#D4F1F4', '#05445E', '#00B4D8']
  };

  // Theme-specific drop speeds
  const themeSpeeds = {
    default: 1,
    matrix: 1.5,
    cyberpunk: 0.8,
    sunset: 1.2,
    ocean: 0.9
  };

  let currentThemeColors = themeColors.default;
  let currentSpeed = themeSpeeds.default;

  // Draw matrix rain
  function drawMatrix() {
    // Clear with slight fade effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
      const text = charArray[Math.floor(Math.random() * charArray.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      // Use current theme colors with glow effect
      const color = currentThemeColors[Math.floor(Math.random() * currentThemeColors.length)];
      ctx.shadowBlur = 15;
      ctx.shadowColor = color;
      ctx.fillStyle = color;
      ctx.fillText(text, x, y);
      ctx.shadowBlur = 0;

      if (y > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i] += currentSpeed;
    }
  }

  // Start matrix effect immediately
  setInterval(drawMatrix, 33);

  // Contact Form Handling
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const submitButton = contactForm.querySelector('.submit-button');

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Show loading state
    submitButton.classList.add('loading');
    submitButton.disabled = true;
    formStatus.style.display = 'none';

    try {
      const formData = {
        from_name: contactForm.name.value,
        from_email: contactForm.email.value,
        message: contactForm.message.value
      };

      const response = await emailjs.send('service_22j911f', 'template_y8tlo0q', formData);

      if (response.status === 200) {
        formStatus.textContent = 'Message sent successfully!';
        formStatus.className = 'form-status success';
        contactForm.reset();
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      formStatus.textContent = 'Failed to send message. Please try again or contact me directly at colbyruphxs1@gmail.com';
      formStatus.className = 'form-status error';
    } finally {
      submitButton.classList.remove('loading');
      submitButton.disabled = false;
    }
  });

  // Easter Egg Menu Functionality
  const aboutImage = document.querySelector('.about-image');
  const easterEggMenu = document.querySelector('.easter-egg-menu');
  const closeMenu = document.querySelector('.close-menu');
  const easterEggItems = document.querySelectorAll('.easter-egg-item');
  let activeTheme = null;

  // Toggle menu on image click
  aboutImage.addEventListener('click', (e) => {
    e.stopPropagation();
    easterEggMenu.classList.toggle('active');
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!easterEggMenu.contains(e.target) && !aboutImage.contains(e.target)) {
      easterEggMenu.classList.remove('active');
    }
  });

  // Close menu with close button
  closeMenu.addEventListener('click', () => {
    easterEggMenu.classList.remove('active');
  });

  // Handle theme changes
  easterEggItems.forEach(item => {
    item.addEventListener('click', () => {
      const theme = item.getAttribute('data-theme');
      
      // Remove previous theme if exists
      if (activeTheme) {
        document.body.classList.remove(`theme-${activeTheme}`);
      }

      // Apply new theme
      if (theme !== activeTheme) {
        document.body.classList.add(`theme-${theme}`);
        activeTheme = theme;
        currentThemeColors = themeColors[theme] || themeColors.default;
        currentSpeed = themeSpeeds[theme] || themeSpeeds.default;
      } else {
        // If clicking the same theme, remove it
        activeTheme = null;
        currentThemeColors = themeColors.default;
        currentSpeed = themeSpeeds.default;
      }

      // Close menu after selection
      easterEggMenu.classList.remove('active');
    });
  });

  // Mobile Navigation Toggle
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  mobileNavToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = mobileNavToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !mobileNavToggle.contains(e.target)) {
      navLinks.classList.remove('active');
      const icon = mobileNavToggle.querySelector('i');
      icon.classList.add('fa-bars');
      icon.classList.remove('fa-times');
    }
  });

  // Close mobile menu when clicking a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      const icon = mobileNavToggle.querySelector('i');
      icon.classList.add('fa-bars');
      icon.classList.remove('fa-times');
    });
  });
}); 