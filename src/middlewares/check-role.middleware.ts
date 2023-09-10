import { StatusCodes } from "http-status-codes";
import { Role } from "../config/app";
import { NextFunction, Request, Response } from "express";
import { IUser } from "../interface/user.interface";

export const CheckRole: (
  role: string
) => (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<Response<any, Record<string, any>> | undefined> =
  (role: string) => async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (user && req.user.role && req.user.role === role) {
      next();
    } else {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .send({ message: "Access denied", success: false });
    }
  };
