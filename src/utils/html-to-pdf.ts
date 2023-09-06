import puppeteer from "puppeteer";
import fs from "fs";
import ejs from "ejs";
import path from "path";
import { Student } from "../types/User";
import { appConfig } from "../config/app";

export const htmlToPdf = async (user: Student) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(`${appConfig.host}/api/students/report-card`, {
    waitUntil: "networkidle0",
  });

  const pdf = await page.pdf({
    path: path.join(__dirname, "../tmp/report-sheet.pdf"),
    printBackground: true,
    scale: 0.6,
    format: "a4",
  });

  await browser.close();

  return pdf;
};
