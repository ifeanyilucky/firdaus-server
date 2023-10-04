import puppeteer from "puppeteer";

export const htmlToPdf = async (html: string, outputPath: string) => {
  const browser = await puppeteer.launch({
    headless: "new",
    executablePath: `/usr/bin/google-chrome`,
    args: [
      `--no-sandbox`,
      `--headless`,
      `--disable-gpu`,
      `--disable-dev-shm-usage`,
    ],
  });

  const page = await browser.newPage();

  await page.setContent(html, {
    waitUntil: "networkidle0",
  });

  const pdf = await page.pdf({
    path: outputPath,
    printBackground: true,
    scale: 1,
    format: "a4",
  });

  await browser.close();

  return pdf;
};
