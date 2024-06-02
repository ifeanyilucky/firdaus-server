"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
var multer_1 = __importDefault(require("multer"));
var storage = multer_1.default.diskStorage({
    destination: "/tmp",
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
exports.upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: function (req, file, callback) {
        if (!file) {
            callback(null, false);
        }
        else {
            callback(null, true);
        }
    },
});
//# sourceMappingURL=multer.js.map