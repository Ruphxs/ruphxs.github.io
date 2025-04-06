document.addEventListener('DOMContentLoaded', () => {
  // Matrix effect is now handled by matrix.js
  
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
        
        // Dispatch theme change event for matrix.js
        document.dispatchEvent(new CustomEvent('themeChange', { 
          detail: { theme: theme } 
        }));
      } else {
        // If clicking the same theme, remove it
        activeTheme = null;
        
        // Dispatch theme change event with null theme to reset
        document.dispatchEvent(new CustomEvent('themeChange', { 
          detail: { theme: null } 
        }));
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

  // Fix for quick action buttons on mobile
  document.addEventListener('DOMContentLoaded', function() {
    const quickActionButtons = document.querySelectorAll('.quick-action-btn');
    
    quickActionButtons.forEach(button => {
      // Prevent default on touch start to avoid issues
      button.addEventListener('touchstart', function(e) {
        e.preventDefault();
        
        // Get the onclick attribute value
        const onclickAttr = this.getAttribute('onclick');
        
        // If it's a direct link (no onclick), follow the href
        if (!onclickAttr) {
          const href = this.getAttribute('href');
          if (href && href !== '#') {
            if (this.getAttribute('target') === '_blank') {
              window.open(href, '_blank');
            } else {
              window.location.href = href;
            }
          }
        } else {
          // If it has an onclick handler, execute it
          const handler = new Function(onclickAttr.replace('return false;', ''));
          handler.call(this);
        }
      }, {passive: false});
      
      // Add active state on touch
      button.addEventListener('touchstart', function() {
        this.classList.add('active');
      });
      
      button.addEventListener('touchend', function() {
        this.classList.remove('active');
      });
      
      button.addEventListener('touchcancel', function() {
        this.classList.remove('active');
      });
    });
  });

  // Skill progress bar animation
  function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    skillBars.forEach(bar => {
      const width = bar.getAttribute('data-width');
      setTimeout(() => {
        bar.style.width = width;
        bar.classList.add('animate');
      }, 300);
    });
  }

  // Intersection Observer for skill bars
  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkillBars();
        skillsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  // Observe skills container
  const skillProgressBars = document.querySelector('.skill-progress-bars');
  if (skillProgressBars) {
    skillsObserver.observe(skillProgressBars);
  }

  // Language Switcher
  const languageBtns = document.querySelectorAll('.language-btn');
  let currentLang = 'en';

  // Language translations
  const translations = {
    'en': {
      'Skills': 'Skills',
      'Skill Levels': 'Skill Levels',
      // Add more translations as needed
    },
    'fr': {
      'Skills': 'Compétences',
      'Skill Levels': 'Niveaux de Compétence',
      // Add more translations as needed
    }
  };

  // Switch language function
  function switchLanguage(lang) {
    if (lang === currentLang) return;
    
    currentLang = lang;
    
    // Update active button
    languageBtns.forEach(btn => {
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
    
    // Update all elements with data-en and data-fr attributes
    const elements = document.querySelectorAll('[data-' + lang + ']');
    elements.forEach(el => {
      el.textContent = el.getAttribute('data-' + lang);
    });
  }

  // Add event listeners to language buttons
  languageBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const lang = this.getAttribute('data-lang');
      switchLanguage(lang);
    });
  });
}); 