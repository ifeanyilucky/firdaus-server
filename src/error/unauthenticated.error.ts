import { StatusCodes } from "http-status-codes";
import CustomError from "./custom.error";

class UnauthenticatedError extends CustomError {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export default UnauthenticatedError;
