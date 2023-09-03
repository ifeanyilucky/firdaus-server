import puppeteer from 'puppeteer';
import fs from 'fs';
// import ejs from 'ejs';
import path from 'path';

export const htmlToPdf = async (user) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('http://localhost:4000/api/students/report-card', {
    waitUntil: 'networkidle0',
  });

  const pdf = await page.pdf({
    path: path.join(__dirname, '../tmp/report-sheet.pdf'),
    printBackground: true,
    scale: 0.6,
    format: 'a4',
  });

  await browser.close();

  // fs.writeFile(
  //   path.join(__dirname, '../views/report-card.ejs'),
  //   pdf,
  //   {},
  //   (err) => {
  //     if (err) {
  //       return console.error('error');
  //     }

  //     console.log('success!');
  //   },
  // );
};
