import { Request, Response } from "express";
import { Term } from "../models/term.model";

export const getCurrentTerm = async (req: Request, res: Response) => {
  const currentDate = new Date();
  const currentTerm = await Term.findOne({
    startDate: { $lte: currentDate },
    endDate: { $gte: currentDate },
  });
  console.log(currentTerm);
  res.status(200).json({ data: currentTerm, success: true });
};
