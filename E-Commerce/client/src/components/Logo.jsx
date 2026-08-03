import React, { useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';

const Logo = ({ className = "h-16 md:h-20 object-contain", forceDark = false }) => {
  const theme = useTheme();
  
  // Dark theme uses white logo, Light theme uses original logo
  // If forceDark is true, always use the original logo (for white backgrounds)
  const logoSrc = (theme === 'dark' && !forceDark) ? '/Logo-LookFashion-white.png' : '/Logo-LookFashion.png';

  // Preload logos to prevent flickering
  useEffect(() => {
    const link1 = document.createElement('link');
    link1.rel = 'preload';
    link1.as = 'image';
    link1.href = '/Logo-LookFashion-white.png';
    
    const link2 = document.createElement('link');
    link2.rel = 'preload';
    link2.as = 'image';
    link2.href = '/Logo-LookFashion.png';
    
    document.head.appendChild(link1);
    document.head.appendChild(link2);
    
    return () => {
      document.head.removeChild(link1);
      document.head.removeChild(link2);
    };
  }, []);

  return (
    <img 
      src={logoSrc} 
      alt="LookFashion." 
      className={className} 
    />
  );
};

export default Logo;
