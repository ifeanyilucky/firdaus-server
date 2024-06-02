"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthenticatedError = exports.CustomError = exports.NotFoundError = exports.BadRequestError = void 0;
var bad_request_error_1 = require("./bad-request.error");
Object.defineProperty(exports, "BadRequestError", { enumerable: true, get: function () { return __importDefault(bad_request_error_1).default; } });
var not_found_error_1 = require("./not-found.error");
Object.defineProperty(exports, "NotFoundError", { enumerable: true, get: function () { return __importDefault(not_found_error_1).default; } });
var custom_error_1 = require("./custom.error");
Object.defineProperty(exports, "CustomError", { enumerable: true, get: function () { return __importDefault(custom_error_1).default; } });
var unauthenticated_error_1 = require("./unauthenticated.error");
Object.defineProperty(exports, "UnauthenticatedError", { enumerable: true, get: function () { return __importDefault(unauthenticated_error_1).default; } });
//# sourceMappingURL=index.js.map