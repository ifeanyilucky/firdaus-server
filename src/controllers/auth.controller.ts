import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import { AuthService } from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
  const data = req.body;
  const register = await AuthService.register({ data });
  res.status(StatusCodes.ACCEPTED).json({ ...register, success: true });
};

export const login = async (req: Request, res: Response) => {
  const loginData = req.body;
  const login = await AuthService.login({ loginData });
  res.status(StatusCodes.ACCEPTED).json({ ...login, success: true });
};

export const account = async (req: Request, res: Response) => {
  const { _id } = req.user;
  const account = await AuthService.account({ id: _id });
  res.status(StatusCodes.OK).json({ data: account, success: true });
};
