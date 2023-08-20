import puppeteer from "puppeteer";
import fs from "fs";
import ejs from "ejs";
import path from "path";
import { Student } from "../types/User";

export async function htmlToPdf(config: Student) {
  // browser instance
  const browser = await puppeteer.launch({ headless: "new" });

  // new page
  const page = await browser.newPage();

  // Get HTML by converting EJS to html
  let htmlFile = "";
  ejs.renderFile(
    path.join(__dirname, "../views/report-card.ejs"),
    { config: "settings" },
    (error, html) => {
      if (error) {
        console.log(error);
      } else {
        htmlFile = html;
      }
    }
  );

  await page.setContent(htmlFile, { waitUntil: "domcontentloaded" });

  // to reflect css used for screens
  await page.emulateMediaType("screen");

  // DOWNLOAD THE PDF
  const pdf = await page.pdf({
    path: `${config.first_name}-${config.last_name}.pdf`,
    margin: { top: "100px", right: "50px", bottom: "100px", left: "50px" },
    printBackground: true,
    format: "A4",
  });

  //   close the browser
  await browser.close();
}
