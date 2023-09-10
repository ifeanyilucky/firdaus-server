import { Request } from "express";
import { IUser, IUserResponse } from "./user.interface";

export interface IRequestAuth extends Request {
  user: IUserResponse;
}
