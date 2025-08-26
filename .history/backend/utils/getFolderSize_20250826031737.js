// utils/getFolderSize.js
const fs = require("fs");
const path = require("path");

function getFolderSize(folderPath) {
  let totalSize = 0;

  function calculateSize(dir) {
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
      const filePath = path.join(dir, file);
      const stats = fs.statSync(filePath);
      if (stats.isDirectory()) {
        calculateSize(filePath); // recursive for subfolders
      } else {
        totalSize += stats.size;
      }
    });
  }

  calculateSize(folderPath);
  return totalSize; // in bytes
}

module.exports = getFolderSize;
