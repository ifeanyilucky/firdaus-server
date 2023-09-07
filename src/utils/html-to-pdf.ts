import puppeteer from "puppeteer";

export const htmlToPdf = async (html: string, outputPath: string) => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  await page.setContent(html, {
    waitUntil: "networkidle0",
  });

  const pdf = await page.pdf({
    path: outputPath,
    printBackground: true,
    scale: 0.6,
    format: "a4",
  });

  await browser.close();

  return pdf;
};
