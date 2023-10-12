import fs from "fs";
import pdf from "html-pdf";
import htmlPdfNode from "html-pdf-node";
import puppeteer from "puppeteer";
import chromium from "chrome-aws-lambda";
import playwright from "playwright-core";

export const convertToPdf = async (html: string, outputPath: string) => {
  const path = await chromium.executablePath;
  console.log(path);
  try {
    const browser = await playwright.chromium.launch({
      args: chromium.args,
      // defaultViewport: chromium.defaultViewport,
      executablePath: path,
      headless: chromium.headless,
      // ignoreHTTPSErrors: true,
    });
    // const browser = await puppeteer.launch({
    //   headless: "new",
    // });

    const page = await browser.newPage();

    await page.setContent(html, {
      // waitUntil: "networkidle0",
      waitUntil: "networkidle",
    });

    const pdf = await page.pdf({
      path: outputPath,
      printBackground: true,
      scale: 1,
      format: "a4",
    });

    await browser.close();

    return pdf;
  } catch (error) {
    console.log(error);
  }
};

export async function htmlToPdf(html: string) {
  return new Promise((resolve, reject) => {
    htmlPdfNode.generatePdf(
      { content: html },
      { format: "A4" },
      (error, buffer: Buffer) => {
        if (error) {
          reject(error);
        }
        resolve(buffer);
      }
    );
  });
}

export async function generatePdf(html: string, filePath: string) {
  return new Promise((resolve, reject) => {
    pdf
      .create(html, {
        format: "A4",
        orientation: "portrait",
        zoomFactor: "0.5",
      })
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
