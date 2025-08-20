import fs from "fs";
import path from "path";
import { exec } from "child_process";

// Middleware to convert .doc -> .docx
export const convertDocToDocx = (req, res, next) => {
  if (!req.file) return next();

  const ext = path.extname(req.file.originalname).toLowerCase();

  // Only convert if it's a .doc file
  if (ext === ".doc") {
    const inputPath = req.file.path;
    const outputPath = inputPath.replace(/\.doc$/, ".docx");

    console.log(`Converting ${inputPath} to ${outputPath}...`);

    // LibreOffice must be installed on server
    exec(
      `soffice --headless --convert-to docx --outdir ${path.dirname(
        inputPath
      )} "${inputPath}"`,
      (err, stdout, stderr) => {
        if (err) {
          console.error("Conversion error:", err);
          return res
            .status(500)
            .json({ message: "Error converting DOC to DOCX" });
        }

        console.log("Conversion stdout:", stdout);
        console.error("Conversion stderr:", stderr);

        // Replace req.file with converted file
        fs.unlinkSync(inputPath); // remove old .doc
        req.file.path = outputPath;
        req.file.filename = path.basename(outputPath);
        req.file.originalname = req.file.originalname.replace(
          /\.doc$/i,
          ".docx"
        );

        console.log("File successfully converted:", req.file);

        next();
      }
    );
  } else {
    next(); // skip if not .doc
  }
};
