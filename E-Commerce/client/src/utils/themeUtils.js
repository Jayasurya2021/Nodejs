// This script runs globally to sync the favicon with the theme

const syncFavicon = () => {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const hasDarkClass = document.documentElement.classList.contains('dark');
  
  const isDark = hasDarkClass || mediaQuery.matches;
  
  const faviconPath = isDark ? '/Logo-LookFashion-white.png' : '/Logo-LookFashion.png';
  
  // Find existing favicon or create a new one
  let link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.getElementsByTagName('head')[0].appendChild(link);
  }
  
  // Only update if it changed
  if (!link.href.endsWith(faviconPath)) {
    link.href = faviconPath;
  }
};

// Initial sync
syncFavicon();

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', syncFavicon);

// Watch for class changes on HTML element
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.attributeName === 'class') {
      syncFavicon();
    }
  });
});

observer.observe(document.documentElement, { attributes: true });
