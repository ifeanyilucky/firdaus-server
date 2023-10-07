import fs from "fs";
import pdf from "html-pdf";

export async function generatePdf(html: string, filePath: string) {
  return new Promise((resolve, reject) => {
    pdf
      .create(html, { format: "Letter" })
      .toFile(filePath, function (err, res) {
        if (err) reject(err);
        resolve(res);
      });
  });
}

// export const htmlToPdf = async (html: string, outputPath: string) => {
//   const browser = await puppeteer.launch({
//     headless: "new",
//   });

//   const page = await browser.newPage();

//   await page.setContent(html, {
//     waitUntil: "networkidle0",
//   });

//   const pdf = await page.pdf({
//     path: outputPath,
//     printBackground: true,
//     scale: 1,
//     format: "a4",
//   });

//   await browser.close();

//   return pdf;
// };
