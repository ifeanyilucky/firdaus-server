import { IUserResponse } from "../interface/user.interface";

export {};

declare global {
  namespace Express {
    interface Request {
      user: IUserResponse;
    }
  }
}

declare module "prince";
