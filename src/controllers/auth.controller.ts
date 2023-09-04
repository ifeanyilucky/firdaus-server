import { Response, Request } from "express";
import { AuthService } from "../services/auth.service";
import { StatusCodes } from "http-status-codes";

export const register = async (req: Request, res: Response) => {
  const data = req.body;
  const register = await AuthService.register({ data });
  res.status(StatusCodes.ACCEPTED).json(register);
};

export const login = async (req: Request, res: Response) => {
  const loginData = req.body;
  const login = await AuthService.login({ loginData });
  res.status(StatusCodes.ACCEPTED).json(login);
};
