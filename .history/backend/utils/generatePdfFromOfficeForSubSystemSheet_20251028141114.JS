import puppeteer from "puppeteer";
import path from "path";
import fs from "fs";
import mammoth from "mammoth";

export async function generatePdfFromOffice(inputPath) {
  try {
    // 1. Define output PDF path
    const filenameWithoutExt = path.basename(
      inputPath,
      path.extname(inputPath)
    );
    const outputDir = "uploads/subSys_technical_sheets_pdf";
    const pdfPath = path.join(outputDir, `${filenameWithoutExt}.pdf`);

    // 2. Create output directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // 3. Convert DOCX to HTML using mammoth
    const result = await mammoth.convertToHtml({ path: inputPath });
    const html = result.value;

    // 4. Use Puppeteer to convert HTML to PDF
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    await page.pdf({
      path: pdfPath,
      format: "A4",
      printBackground: true,
      margin: {
        top: "20px",
        right: "20px",
        bottom: "20px",
        left: "20px",
      },
    });

    await browser.close();

    console.log(`PDF generated successfully at: ${pdfPath}`);

    // 5. IMPORTANT: Return the PDF path
    return pdfPath;
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error;
  }
}
