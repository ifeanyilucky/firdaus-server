import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { ReportService } from "../services/report.service";

export const getReports = async (req: Request, res: Response) => {
  const data = await ReportService.allReports();
  res.status(StatusCodes.OK).json({ data, success: true });
};

export const deleteReport = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await ReportService.deleteReport(id);
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

export const createReport = async (req: Request, res: Response) => {
  const { body } = req;
  const data = await ReportService.createReport({ data: body });
  res.status(StatusCodes.OK).json({ data, success: true });
};
