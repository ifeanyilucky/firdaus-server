import { StatusCodes } from "http-status-codes";
import { Role } from "../config/app";
import { NextFunction, Request, Response } from "express";
import { IUser } from "../interface/user.interface";

interface IReqUser extends Request {
  user: IUser;
}
export const CheckRole =
  (role: Role) => async (req: IReqUser, res: Response, next: NextFunction) => {
    const user = req.user;
    if (user && req.user.role && req.user.role === role) {
      next();
    } else {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .send({ message: "Access denied" });
    }
  };
