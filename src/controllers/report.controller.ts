import { StatusCodes } from "http-status-codes";
import { Request, Response, response } from "express";
import { ReportService } from "../services/report.service";
import { IUserResponse } from "../interface/user.interface";
import { IReport, Term } from "../interface/report.interface";
import path from "path";
import fs from "fs";

export const getReports = async (req: Request, res: Response) => {
  const data = await ReportService.allReports(req.query as any);
  res.status(StatusCodes.OK).json({ data, success: true });
};

export const deleteReport = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await ReportService.deleteReport({ id });
  res.status(StatusCodes.OK).json({ data, success: true });
};

export const getReport = async (req: Request, res: Response) => {
  const id = req.query.id as string;
  const data = await ReportService.findReport({ id });
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

export const createReport = async (req: Request, res: Response) => {
  const reportData: IReport = req.body;

  const data = await ReportService.createReport({
    data: reportData,
    teacherId: req.user._id,
  });
  res.status(StatusCodes.OK).json({ data, success: true });
};

export const downloadReport = async (req: Request, res: Response) => {
  const { selectedTerm, selectedClass, student, classSection } = req.query;
  const { user } = req;

  const response = await ReportService.downloadReport({
    selectedTerm: selectedTerm as string,
    selectedClass: selectedClass as string,
    student: student as string,
    classSection: classSection as string,
    reportId: req.params.id,
    user,
  });

  res.download(response, "report.pdf", (err) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error generating the PDF");
    } else {
      fs.unlink(response, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  });
};
