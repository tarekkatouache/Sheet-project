const fs = require("fs").promises;
const path = require("path");

async function getFolderSize(folderPath) {
  const items = await fs.readdir(folderPath);
  let totalSize = 0;

  for (const item of items) {
    const itemPath = path.join(folderPath, item);
    const stat = await fs.stat(itemPath);

    if (stat.isDirectory()) {
      // Recursively get the size of the subdirectory
      totalSize += await getFolderSize(itemPath);
    } else {
      // Add the file's size to the total
      totalSize += stat.size;
    }
  }

  return totalSize;
}
