const fs = require("fs");
const path = require("path");

const uploadsDir = path.join(__dirname, "../uploads/technical_sheets");

function getFolderSize(dirPath) {
  let totalSize = 0;

  function calculateSize(folder) {
    const files = fs.readdirSync(folder);
    for (const file of files) {
      const filePath = path.join(folder, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        calculateSize(filePath);
      } else {
        totalSize += stats.size;
      }
    }
  }

  calculateSize(dirPath);
  return totalSize;
}

function getReadableSize(bytes) {
  const sizes = ["Bytes", "KB", "MB", "GB"];
  if (bytes === 0) return "0 Byte";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return (bytes / Math.pow(1024, i)).toFixed(2) + " " + sizes[i];
}

function getUploadsSize() {
  const sizeInBytes = getFolderSize(uploadsDir);
  return {
    sizeInBytes,
    sizeFormatted: getReadableSize(sizeInBytes),
  };
}

module.exports = { getUploadsSize };
