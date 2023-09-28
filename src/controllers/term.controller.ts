import { Request, Response } from "express";
import { ITerm, Term } from "../models/term.model";
import { BadRequestError } from "../error";

export const getCurrentTerm = async (req: Request, res: Response) => {
  const currentDate = new Date();
  const currentTerm = await Term.findOne({
    startDate: { $lte: currentDate },
    endDate: { $gte: currentDate },
  });
  console.log(currentTerm);
  res.status(200).json({ data: currentTerm, success: true });
};

export const createTerm = async (req: Request, res: Response) => {
  const { endDate, startDate, name }: ITerm = req.body;
  if (!startDate) throw new BadRequestError("Please enter start date of term");
  if (!endDate) throw new BadRequestError("Please enter end date of term");
  if (!name) throw new BadRequestError("Please select term");
  const newTerm = await Term.create({ ...req.body });
  res.status(200).json({ data: newTerm, success: true });
};
