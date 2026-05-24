const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// Revert main backgrounds to light
css = css.replace('--bg-main: #0B0619;', '--bg-main: #ffffff;');
css = css.replace('--bg-secondary: #150A2E;', '--bg-secondary: #f8fafc;');
css = css.replace('--bg-card: rgba(24, 11, 51, 0.75);', '--bg-card: rgba(255, 255, 255, 0.75);');
css = css.replace('--bg-card-hover: rgba(36, 17, 74, 0.95);', '--bg-card-hover: rgba(255, 255, 255, 0.95);');

// Text colors revert to dark slate
css = css.replace('--text-primary: #F3E8FF;', '--text-primary: #0f172a;');
css = css.replace('--text-secondary: #D8B4FE;', '--text-secondary: #334155;');
css = css.replace('--text-muted: #A855F7;', '--text-muted: #64748b;');

css = css.replace(/Premium Dark Purple Theme/g, 'Premium Light Purple Theme');

// Contact section background gradients back to light purple tones
css = css.replace(/#150A2E/g, '#f3e8ff');
css = css.replace(/#1F0E42/g, '#e9d5ff');
css = css.replace(/#0B0619/g, '#faf5ff');
css = css.replace(/rgba\(31, 14, 66/g, 'rgba(233, 213, 255');

// Revert white backgrounds/overlays
css = css.replace(/rgba\(24, 11, 51, 0\.75\)/g, 'rgba(255, 255, 255, 0.75)');
css = css.replace(/rgba\(24, 11, 51, 0\.95\)/g, 'rgba(255, 255, 255, 0.95)');
css = css.replace(/rgba\(24, 11, 51, 0\.92\)/g, 'rgba(255, 255, 255, 0.92)');
css = css.replace(/rgba\(24, 11, 51, 0\.88\)/g, 'rgba(255, 255, 255, 0.88)');
css = css.replace(/rgba\(24, 11, 51, 0\.78\)/g, 'rgba(255, 255, 255, 0.78)');
css = css.replace(/rgba\(24, 11, 51, 0\.72\)/g, 'rgba(255, 255, 255, 0.72)');
css = css.replace(/rgba\(11, 6, 25, 0\.6\)/g, 'rgba(255, 255, 255, 0.15)');
css = css.replace(/rgba\(11, 6, 25, 0\.0\)/g, 'rgba(255, 255, 255, 0.0)');
css = css.replace(/background:\s*#150A2E/g, 'background: #ffffff');

// Fix explicit colors and text shadows back to light theme versions
css = css.replace(/border:\s*2px solid #3B1C7A/g, 'border: 2px solid #ffffff'); // dots
css = css.replace(/text-shadow:\s*0 1px 4px rgba\(0,0,0,0\.8\)/g, 'text-shadow: 0 1px 4px rgba(255,255,255,0.6)');
css = css.replace(/text-shadow:\s*0 2px 16px rgba\(0,0,0,0\.9\)/g, 'text-shadow: 0 2px 16px rgba(255,255,255,0.9)');
css = css.replace(/text-shadow:\s*0 1px 6px rgba\(0,0,0,0\.8\)/g, 'text-shadow: 0 1px 6px rgba(255,255,255,0.7)');

// Remove the global overrides I appended previously
css = css.replace(/\/\* Global Purple Dark Overrides \*\/(.|\n)*/g, '');

fs.writeFileSync('src/index.css', css, 'utf8');
console.log('Converted to Light Purple theme');
