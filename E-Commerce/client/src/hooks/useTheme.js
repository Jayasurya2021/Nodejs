import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Check system preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check if there is a 'dark' class on HTML element
    const checkTheme = () => {
      const hasDarkClass = document.documentElement.classList.contains('dark');
      if (hasDarkClass) {
        setTheme('dark');
      } else {
        setTheme(mediaQuery.matches ? 'dark' : 'light');
      }
    };

    // Initial check
    checkTheme();

    // Listen for system theme changes
    const handleChange = () => checkTheme();
    mediaQuery.addEventListener('change', handleChange);

    // Watch for class changes on HTML element (if manual theme toggle is implemented)
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          checkTheme();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      observer.disconnect();
    };
  }, []);

  return theme;
};
