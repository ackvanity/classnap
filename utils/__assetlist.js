// generateImageList.js
const fs = require('fs');
const path = require('path');

const folder = 'assets';

function walk(dir) {
  let files = [];
  for (const f of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, f);
    if (fs.statSync(fullPath).isDirectory()) {
      files = files.concat(walk(fullPath));
    } else {
      if (fullPath.endsWith('.svg') || fullPath.endsWith('.png')) {
        files.push(fullPath.replace(/\\/g, '/')); // use forward slashes
      }
    }
  }
  return files;
}

const imageFiles = walk(folder);
console.log('const imageFiles =', JSON.stringify(imageFiles, null, 2), ';');
