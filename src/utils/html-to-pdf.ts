import puppeteer from "puppeteer";
import fs from "fs";

export async function convertToPdf(url: string) {
  // browser instance
  const browser = await puppeteer.launch({ headless: "new" });

  // new page
  const page = await browser.newPage();

  // Get HTML
  const html = fs.readFileSync(url, "utf-8");
  await page.setContent(html, { waitUntil: "domcontentloaded" });

  // to reflect css used for screens
  await page.emulateMediaType("screen");

  // DOWNLOAD THE PDF
  const pdf = await page.pdf({
    path: "result.pdf",
    margin: { top: "100px", right: "50px", bottom: "100px", left: "50px" },
    printBackground: true,
    format: "A4",
  });

  //   close the browser
  await browser.close();
}
