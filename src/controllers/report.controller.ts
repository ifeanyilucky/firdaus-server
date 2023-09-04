import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { ReportService } from "../services/report.service";

export const getReports = async (req: Request, res: Response) => {
  const data = await ReportService.allReports();
  res.status(StatusCodes.OK).json({ data, success: true });
};
