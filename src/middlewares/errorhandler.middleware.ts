import { Response, NextFunction, Request } from "express";
import { appConfig } from "../config/app";
import { CustomError } from "../error";
import { StatusCodes } from "http-status-codes";

export const ErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Middleware Error Handling");

  console.log(err);
  let customError = {
    //set default
    // @ts-ignore
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something went wrong try again later",
  };
  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ message: err.message });
  // }

  if (err.name === "ValidationError") {
    // @ts-ignore
    customError.message = Object.values(err.errors)
      .map((item: any) => item.message)
      .join(", ");

    customError.statusCode = 400;
  }

  if (err.name === "CastError") {
    // @ts-ignore
    customError.message = `No item found with id: ${err.value}`;
    customError.statusCode = StatusCodes.NOT_FOUND;
  }

  // check for existing email
  // @ts-ignore
  if (err.code && err.code === 11000) {
    // @ts-ignore
    customError.message = `${Object.keys(err.keyValue)} is already taken`;
    customError.statusCode = 400;
  }
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
  return res
    .status(customError.statusCode)
    .json({ message: customError.message, success: false });
};
