const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// Theme Colors
css = css.replace('--bg-main: #ffffff;', '--bg-main: #0B0619;');
css = css.replace('--bg-secondary: #f8fafc;', '--bg-secondary: #150A2E;');
css = css.replace('--bg-card: rgba(255, 255, 255, 0.75);', '--bg-card: rgba(24, 11, 51, 0.75);');
css = css.replace('--bg-card-hover: rgba(255, 255, 255, 0.95);', '--bg-card-hover: rgba(36, 17, 74, 0.95);');

css = css.replace('--primary: #1d4ed8;', '--primary: #7C3AED;');
css = css.replace('--primary-hover: #1e40af;', '--primary-hover: #9333EA;');
css = css.replace('--accent: #2563eb;', '--accent: #8B5CF6;');
css = css.replace('--accent-light: #0ea5e9;', '--accent-light: #A78BFA;');

css = css.replace('--text-primary: #0f172a;', '--text-primary: #F3E8FF;');
css = css.replace('--text-secondary: #334155;', '--text-secondary: #D8B4FE;');
css = css.replace('--text-muted: #64748b;', '--text-muted: #A855F7;');
css = css.replace('--text-highlight: #2563eb;', '--text-highlight: #C084FC;');

css = css.replace(/Premium White & Blue Theme/g, 'Premium Dark Purple Theme');

// Replace all rgb blues with purple
css = css.replace(/37,\s*99,\s*235/g, '124, 58, 237'); // #2563eb -> #7C3AED
css = css.replace(/15,\s*23,\s*42/g, '0, 0, 0'); // dark slate shadow -> black shadow
css = css.replace(/56,\s*189,\s*248/g, '167, 139, 250'); // #38bdf8 -> #A78BFA

// Contact section background gradients
css = css.replace(/#e8f0fe/g, '#150A2E');
css = css.replace(/#dbeafe/g, '#1F0E42');
css = css.replace(/#eff6ff/g, '#0B0619');
css = css.replace(/rgba\(219,\s*234,\s*254/g, 'rgba(31, 14, 66');

// Replace white backgrounds/overlays with dark purple overlays
css = css.replace(/rgba\(255,\s*255,\s*255,\s*0\.75\)/g, 'rgba(24, 11, 51, 0.75)');
css = css.replace(/rgba\(255,\s*255,\s*255,\s*0\.95\)/g, 'rgba(24, 11, 51, 0.95)');
css = css.replace(/rgba\(255,\s*255,\s*255,\s*0\.92\)/g, 'rgba(24, 11, 51, 0.92)');
css = css.replace(/rgba\(255,\s*255,\s*255,\s*0\.88\)/g, 'rgba(24, 11, 51, 0.88)');
css = css.replace(/rgba\(255,\s*255,\s*255,\s*0\.78\)/g, 'rgba(24, 11, 51, 0.78)');
css = css.replace(/rgba\(255,\s*255,\s*255,\s*0\.72\)/g, 'rgba(24, 11, 51, 0.72)');
css = css.replace(/rgba\(255,\s*255,\s*255,\s*0\.15\)/g, 'rgba(11, 6, 25, 0.6)');
css = css.replace(/rgba\(255,\s*255,\s*255,\s*0\.0\)/g, 'rgba(11, 6, 25, 0.0)');
css = css.replace(/background:\s*#ffffff/g, 'background: #150A2E');

// Fix explicit colors
css = css.replace(/color:\s*#ffffff/g, 'color: #ffffff'); // Keep explicitly white text
css = css.replace(/border:\s*2px solid #ffffff/g, 'border: 2px solid #3B1C7A'); // dots

// Fix text shadows which used white in light mode
css = css.replace(/text-shadow:\s*0 1px 4px rgba\(255,255,255,0\.6\)/g, 'text-shadow: 0 1px 4px rgba(0,0,0,0.8)');
css = css.replace(/text-shadow:\s*0 2px 16px rgba\(255,255,255,0\.9\)/g, 'text-shadow: 0 2px 16px rgba(0,0,0,0.9)');
css = css.replace(/text-shadow:\s*0 1px 6px rgba\(255,255,255,0\.7\)/g, 'text-shadow: 0 1px 6px rgba(0,0,0,0.8)');

// Add generic overrides
css += `
/* Global Purple Dark Overrides */
body {
    background-color: var(--bg-main) !important;
}
.contact-input {
    background: rgba(30, 15, 60, 0.9) !important;
    border: 1px solid rgba(124, 58, 237, 0.3) !important;
    color: white !important;
}
.contact-input:focus {
    background: rgba(40, 20, 80, 0.9) !important;
    border-color: #7C3AED !important;
}
`;

fs.writeFileSync('src/index.css', css, 'utf8');
console.log('Theme converted successfully');
