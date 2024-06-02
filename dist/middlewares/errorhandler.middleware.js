"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
var http_status_codes_1 = require("http-status-codes");
var ErrorHandler = function (err, req, res, next) {
    console.log("Middleware Error Handling");
    console.log(err);
    var customError = {
        //set default
        // @ts-ignore
        statusCode: err.statusCode || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || "Something went wrong try again later",
    };
    // if (err instanceof CustomAPIError) {
    //   return res.status(err.statusCode).json({ message: err.message });
    // }
    if (err.name === "ValidationError") {
        // @ts-ignore
        customError.message = Object.values(err.errors)
            .map(function (item) { return item.message; })
            .join(", ");
        customError.statusCode = 400;
    }
    if (err.name === "CastError") {
        // @ts-ignore
        customError.message = "No item found with id: ".concat(err.value);
        customError.statusCode = http_status_codes_1.StatusCodes.NOT_FOUND;
    }
    // check for existing email
    // @ts-ignore
    if (err.code && err.code === 11000) {
        // @ts-ignore
        customError.message = "".concat(Object.keys(err.keyValue), " is already taken");
        customError.statusCode = 400;
    }
    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
    return res
        .status(customError.statusCode)
        .json({ message: customError.message, success: false });
};
exports.ErrorHandler = ErrorHandler;
//# sourceMappingURL=errorhandler.middleware.js.map