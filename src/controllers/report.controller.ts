import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { ReportService } from "../services/report.service";
import { IUserResponse } from "../interface/user.interface";
import { IReport, Term } from "../interface/report.interface";
import { htmlToPdf } from "../utils/html-to-pdf";
import path from "path";
import fs from "fs";

interface IUserRequest extends Request {
  user: IUserResponse;
}
export const getReports = async (req: Request, res: Response) => {
  const data = await ReportService.allReports();
  res.status(StatusCodes.OK).json({ data, success: true });
};

export const deleteReport = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await ReportService.deleteReport({ id });
  res.status(StatusCodes.OK).json({ data, success: true });
};

export const getReport = async (req: Request, res: Response) => {
  const data = await ReportService.allReports();
  res.status(StatusCodes.OK).json({ data, success: true });
};

export const updateReport = async (req: Request, res: Response) => {
  const {
    body,
    params: { id },
  } = req;
  const data = await ReportService.updateReport({ id, data: body });
  res.status(StatusCodes.OK).json({ data, success: true });
};

export const createReport = async (req: IUserRequest, res: Response) => {
  const reportData: IReport = req.body;

  const data = await ReportService.createReport({
    data: reportData,
    teacherId: req.user._id,
  });
  res.status(StatusCodes.OK).json({ data, success: true });
};

export const downloadReport = async (req: IUserRequest, res: Response) => {
  console.log(req.query);
  console.log(req.user);
  const term = "FIRST_TERM" as unknown as Term;
  const pdf = await ReportService.downloadReport({
    studentId: "DDDFF",
    term,
    class: "JSS3",
  });

  const reportPath = path.join(__dirname, "../tmp/report-sheet.pdf");
  await htmlToPdf(pdf, reportPath)
    .then(() => {
      console.log("Pdf created successfully");
    })
    .catch((error) => {
      console.log("ERror creating PDF", error);
    });

  // res.set({ "Content-Type": "application/pdf", "Content-Length": pdf.length });
  // res.status(StatusCodes.ACCEPTED).json({ success: true, data: file });
  res.download(reportPath, "report.pdf", (err) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error generating the PDF");
    } else {
      fs.unlink(reportPath, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  });
};
