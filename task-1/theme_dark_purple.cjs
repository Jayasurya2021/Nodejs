const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// Glass/card backgrounds: white → dark purple glass
css = css.replace(/background:\s*rgba\(255, 255, 255, 0\.92\)/g, 'background: rgba(15, 8, 30, 0.92)');
css = css.replace(/background:\s*rgba\(255, 255, 255, 0\.88\)/g, 'background: rgba(15, 8, 30, 0.88)');
css = css.replace(/background:\s*rgba\(255, 255, 255, 0\.78\)/g, 'background: rgba(15, 8, 30, 0.85)');
css = css.replace(/background:\s*rgba\(255, 255, 255, 0\.72\)/g, 'background: rgba(15, 8, 30, 0.80)');
css = css.replace(/background:\s*rgba\(255, 255, 255, 0\.75\)/g, 'background: rgba(15, 8, 30, 0.80)');

// Banner overlay gradients: white → dark
css = css.replace(/rgba\(255, 255, 255, 0\.0\) 0%/g, 'rgba(5, 1, 13, 0.0) 0%');
css = css.replace(/rgba\(255, 255, 255, 0\.15\) 45%/g, 'rgba(5, 1, 13, 0.40) 45%');
css = css.replace(/rgba\(255, 255, 255, 0\.72\) 80%/g, 'rgba(5, 1, 13, 0.85) 80%');

// Stats capsule white bg → dark glass
css = css.replace(/background:\s*rgba\(255, 255, 255, 0\.88\)/g, 'background: rgba(15, 8, 30, 0.88)');

// Section backgrounds that use #f8fafc or #ffffff
css = css.replace(/background-color:\s*#ffffff/g, 'background-color: #05010D');
css = css.replace(/background:\s*#ffffff/g, 'background: #05010D');
css = css.replace(/background-color:\s*#f8fafc/g, 'background-color: #0D051F');
css = css.replace(/background:\s*#f8fafc/g, 'background: #0D051F');

// Dot borders
css = css.replace(/border:\s*2px solid #ffffff/g, 'border: 2px solid rgba(124, 58, 237, 0.4)');

// Text shadows: light → dark
css = css.replace(/text-shadow:\s*0 2px 16px rgba\(255,255,255,0\.9\)/g, 'text-shadow: 0 2px 16px rgba(0,0,0,0.6)');
css = css.replace(/text-shadow:\s*0 1px 6px rgba\(255,255,255,0\.7\)/g, 'text-shadow: 0 1px 6px rgba(0,0,0,0.5)');
css = css.replace(/text-shadow:\s*0 1px 4px rgba\(255,255,255,0\.6\)/g, 'text-shadow: 0 1px 4px rgba(0,0,0,0.5)');

// Footer border with white → dark glass
css = css.replace(/border:\s*1px solid rgba\(255, 255, 255, 0\.15\)/g, 'border: 1px solid rgba(124, 58, 237, 0.15)');

// Ticker section (blue gradient → purple gradient)
css = css.replace(
  /background:\s*linear-gradient\(90deg, #1d4ed8 0%, #2563eb 50%, #3b82f6 100%\)/g,
  'background: linear-gradient(90deg, #5B21B6 0%, #7C3AED 50%, #8B5CF6 100%)'
);

fs.writeFileSync('src/index.css', css, 'utf8');
console.log('Done: Converted to Black + Purple dark theme');
