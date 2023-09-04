import CustomError from "./custom.error";
import { StatusCodes } from "http-status-codes";

class BadRequestError extends CustomError {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message, statusCode);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export default BadRequestError;
