import { Request, Response } from "express";

export const NotFound = (req: Request, res: Response) =>
  res.status(404).send({ message: "Route does not exist", success: false });
