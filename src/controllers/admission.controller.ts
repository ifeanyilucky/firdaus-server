import { Request, Response } from "express";
import { AdmissionService } from "../services/admission.service";
import { StatusCodes } from "http-status-codes";

export const getAdmissions = async (req: Request, res: Response) => {
  const admissions = await AdmissionService.getAdmissions({
    _id: req.params._id,
  });
  res.status(StatusCodes.ACCEPTED).json({ success: true, data: admissions });
};

export const getAdmission = async (req: Request, res: Response) => {
  const admission = await AdmissionService.getSingleAdmission({
    _id: req.params.id,
  });

  res.status(StatusCodes.ACCEPTED).json({ success: true, data: admission });
};

export const createAdmission = async (req: Request, res: Response) => {
  const admission = await AdmissionService.createAdmission({ data: req.body });
};
