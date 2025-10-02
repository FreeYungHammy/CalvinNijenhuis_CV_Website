// Debug: Script is loading
console.log('CV Website JavaScript loaded successfully!');

// Make functions globally accessible
window.togglePhone = function() {
  console.log('togglePhone called');
  const button = document.getElementById('phone-button');
  if (!button) {
    console.error('Phone button not found!');
    return;
  }
  
  const showingNumber = button.getAttribute('data-showing') === 'true';

  if (!showingNumber) {
    button.innerHTML = `
      <i class="fas fa-phone"></i>
      <span class="text">+27 79 894 4821</span>
    `;
    button.setAttribute('data-showing', 'true');
    console.log('Phone number revealed');
  } else {
    button.innerHTML = `
      <i class="fas fa-phone"></i>
      <span class="text">Phone Number</span>
    `;
    button.setAttribute('data-showing', 'false');
    console.log('Phone number hidden');
  }
};

window.toggleEmail = function() {
  console.log('toggleEmail called');
  const button = document.getElementById('email-button');
  if (!button) {
    console.error('Email button not found!');
    return;
  }
  
  const showingEmail = button.getAttribute('data-showing') === 'true';

  if (!showingEmail) {
    button.innerHTML = `
      <i class="fas fa-envelope"></i>
      <span class="text">calvin@nijenhuis.life</span>
    `;
    button.setAttribute('data-showing', 'true');
    console.log('Email address revealed');
  } else {
    button.innerHTML = `
      <i class="fas fa-envelope"></i>
      <span class="text">Email Address</span>
    `;
    button.setAttribute('data-showing', 'false');
    console.log('Email address hidden');
  }
};

// Theme Management
class ThemeManager {
  constructor() {
    this.theme = localStorage.getItem('theme') || 'light';
    this.init();
  }

  init() {
    this.applyTheme();
    this.setupToggle();
  }

  applyTheme() {
    document.documentElement.setAttribute('data-theme', this.theme);
    localStorage.setItem('theme', this.theme);
  }

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    this.applyTheme();
    console.log('Theme switched to:', this.theme);
    
    // Add a subtle animation effect
    document.body.style.transition = 'none';
    setTimeout(() => {
      document.body.style.transition = '';
    }, 50);
  }

  setupToggle() {
    const toggle = document.getElementById('themeToggle');
    if (toggle) {
      console.log('Theme toggle found and setting up event listeners');
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Theme toggle clicked');
        this.toggleTheme();
      });
      
      // Add keyboard support
      toggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          console.log('Theme toggle activated via keyboard');
          this.toggleTheme();
        }
      });
      
      // Make it focusable
      toggle.setAttribute('tabindex', '0');
      toggle.setAttribute('role', 'switch');
      toggle.setAttribute('aria-label', 'Toggle dark mode');
    } else {
      console.error('Theme toggle element not found!');
    }
  }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing website functionality...');
  
  // Initialize theme manager
  console.log('Creating theme manager...');
  new ThemeManager();

  // Mobile navigation toggle
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function() {
      mainNav.classList.toggle('active');
    });
  }

  // Close mobile nav when clicking on a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (mainNav) {
        mainNav.classList.remove('active');
      }
    });
  });

  // Test the contact buttons to make sure they work
  const emailButton = document.getElementById('email-button');
  const phoneButton = document.getElementById('phone-button');
  const themeToggle = document.getElementById('themeToggle');
  
  if (emailButton) {
    console.log('Email button found and ready');
    // Test that the onclick function is accessible
    if (typeof window.toggleEmail === 'function') {
      console.log('toggleEmail function is accessible');
    } else {
      console.error('toggleEmail function is NOT accessible');
    }
  } else {
    console.error('Email button NOT found');
  }
  
  if (phoneButton) {
    console.log('Phone button found and ready');
    // Test that the onclick function is accessible
    if (typeof window.togglePhone === 'function') {
      console.log('togglePhone function is accessible');
    } else {
      console.error('togglePhone function is NOT accessible');
    }
  } else {
    console.error('Phone button NOT found');
  }

  if (themeToggle) {
    console.log('Theme toggle found and ready');
  } else {
    console.error('Theme toggle NOT found');
  }

  // Animate elements when they come into view
  const animateElements = document.querySelectorAll('.skill-category, .project-item, .education-item, .portfolio-item');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  animateElements.forEach(el => {
    observer.observe(el);
  });
});
