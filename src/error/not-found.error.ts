import CustomError from "./custom.error";
import { StatusCodes } from "http-status-codes";

class NotFoundError extends CustomError {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

export default NotFoundError;
