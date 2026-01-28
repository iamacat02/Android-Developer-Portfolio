/**
 * Theme Management Module
 * Handles dark/light theme switching and persistence
 */
const ThemeManager = (() => {
  const STORAGE_KEY = "theme";
  const DARK_THEME = "dark";
  const LIGHT_THEME = "light";

  const init = () => {
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    if (savedTheme) {
      document.body.setAttribute("data-theme", savedTheme);
    }
    attachEventListeners();
  };

  const attachEventListeners = () => {
    const themeBtn = document.getElementById("themeBtn");
    if (themeBtn) {
      themeBtn.addEventListener("click", toggleTheme);
    }
  };

  const toggleTheme = () => {
    const currentTheme = document.body.getAttribute("data-theme");
    const nextTheme = currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
    
    document.body.setAttribute("data-theme", nextTheme);
    localStorage.setItem(STORAGE_KEY, nextTheme);
  };

  return { init };
})();

/**
 * Footer Module
 * Updates footer with current year
 */
const FooterManager = (() => {
  const init = () => {
    updateYear();
  };

  const updateYear = () => {
    const yearElement = document.getElementById("year");
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  };

  return { init };
})();

/**
 * Animation Module
 * Handles scroll-based animations and element entrance effects
 */
const AnimationManager = (() => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const init = () => {
    if ('IntersectionObserver' in window) {
      setupScrollAnimations();
    }
  };

  const setupScrollAnimations = () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateElement(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
      observer.observe(section);
    });
  };

  const animateElement = (element) => {
    element.style.animation = 'slideInUp 0.7s ease-out forwards';
  };

  return { init };
})();

/**
 * Profile Manager
 * Handles profile card title toggling and animations
 */
const ProfileManager = (() => {
  const init = () => {
    setupTitleToggle();
  };

  const setupTitleToggle = () => {
    const titleMain = document.getElementById('titleMain');
    const titleSecond = document.getElementById('titleSecond');

    if (!titleMain || !titleSecond) return;

    // Toggle titles every 8 seconds
    setInterval(() => {
      titleMain.classList.toggle('active');
      titleSecond.classList.toggle('active');
    }, 8000);
  };

  return { init };
})();

/**
 * Application Initialization
 * Runs all modules when DOM is ready
 */
document.addEventListener("DOMContentLoaded", () => {
  ThemeManager.init();
  FooterManager.init();
  AnimationManager.init();
  ProfileManager.init();
});
