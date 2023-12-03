import { Request, Response } from "express";
import { SubjectService } from "../services/subject.service";
import { StatusCodes } from "http-status-codes";
import { ISubject } from "../interface/subject.interface";
import mongoose from "mongoose";

export const createSubject = (req: Request, res: Response) => {};

export const addSubjects = async (req: Request, res: Response) => {
  const { subjects, user_id } = req.body;
  const subject = await SubjectService().addSubjects({
    user_id,
    subjects: subjects as ISubject[],
  });
  res.status(StatusCodes.ACCEPTED).json({ success: true, data: subject });
};

export const findSubjects = async (req: Request, res: Response) => {
  const { user_id } = req.params;
  const subjects = await SubjectService().getAllSubjects({
    user_id: user_id as unknown as mongoose.Types.ObjectId,
  });
  res.status(StatusCodes.ACCEPTED).json({ success: true, data: subjects });
};

export const removeSubject = async (req: Request, res: Response) => {
  const { user_id, subject_code } = req.body;
  const subjects = await SubjectService().deleteSubject({
    user_id,
    subject_code,
  });

  res.status(StatusCodes.ACCEPTED).json({ success: true, data: subjects });
};

export const updateSubject = async (req: Request, res: Response) => {
  const { subjects } = req.body;
  const { user_id } = req.params;
  const updatedSubjects = await SubjectService().updateSubjects({
    user_id,
    subjects,
  });

  res
    .status(StatusCodes.ACCEPTED)
    .json({ success: true, data: updatedSubjects });
};
