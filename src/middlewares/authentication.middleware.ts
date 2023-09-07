import { NextFunction, Request, Response } from "express";
import { UnauthenticatedError } from "../error";
import Jwt from "jsonwebtoken";
import { appConfig } from "../config/app";
import { User } from "../models/user.model";
import { IUser } from "../interface/user.interface";

interface IJWTPayload extends Jwt.JwtPayload {
  userId: string;
}
interface IExtendsRequest extends Request {
  user?: IUser;
}
export const auth = async (
  req: IExtendsRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader?.startsWith("Bearer"))
    throw new UnauthenticatedError("Authentication is invalid");

  const token = authHeader.split(" ")[1];
  const payload = Jwt.verify(
    token,
    appConfig.jwtSecret as string
  ) as IJWTPayload;

  try {
    const userAccount = await User.findOne({ _id: payload.userId as string });

    // @ts-ignore
    req.user = userAccount;
    next();
  } catch (error) {
    throw new UnauthenticatedError("Not authorized to access this route");
  }
};
