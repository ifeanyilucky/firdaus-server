import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { ReportService } from "../services/report.service";
import { IUserResponse } from "../interface/user.interface";
import { IReport } from "../interface/report.interface";

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
  const {
    body: { term },
    user: { _id },
  } = req;

  const pdf = await ReportService.downloadReport({
    studentId: _id,
    term,
    class: req.user.class,
  });

  // @ts-ignore
  res.set({ "Content-Type": "application/pdf", "Content-Length": pdf.length });

  res.status(StatusCodes.OK).send(pdf);
};
