import { ClassService } from "../services/class.service";
import { Request, Response } from "express";

export const moveToNextClass = async (req: Request, res: Response) => {
  const { currentClass, studentId } = req.body;
  const result = await ClassService.moveToNextClass({
    currentClass,
    studentId,
  });

  res.status(200).json({ success: true, data: result });
};
