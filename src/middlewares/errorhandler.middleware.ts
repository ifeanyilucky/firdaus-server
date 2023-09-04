import { Response, NextFunction, Request } from "express";
import { appConfig } from "../config/app";

export const ErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Middleware Error Handling");

  //   @ts-ignore
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || "Something went wrong";

  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: appConfig.isDevelopment ? err.stack : {},
  });
};
