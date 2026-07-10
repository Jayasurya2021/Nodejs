const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.js') || file.endsWith('.jsx')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk(path.join(__dirname, 'client/src'));
let changedFiles = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Pattern 1: { headers: { Authorization: `Bearer ${user.token}` }, withCredentials: true }
  // Pattern 2: { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${user.token}` }, withCredentials: true }
  
  // Just use regex to strip out the Authorization key and its value
  content = content.replace(/,\s*Authorization:\s*`Bearer \$\{user\.token\}`/g, '');
  content = content.replace(/Authorization:\s*`Bearer \$\{user\.token\}`\s*,?\s*/g, '');
  
  // If headers is now empty, e.g. headers: {}
  content = content.replace(/headers:\s*{\s*}\s*,?\s*/g, '');
  
  // Cleanup config objects that might be empty or malformed
  // const config = { , withCredentials: true };
  content = content.replace(/const config = { \s*,\s*withCredentials: true };/g, 'const config = { withCredentials: true };');
  content = content.replace(/const config = {\s*withCredentials: true\s*};/g, 'const config = { withCredentials: true };');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated: ${file}`);
    changedFiles++;
  }
});

console.log(`Total files changed: ${changedFiles}`);
