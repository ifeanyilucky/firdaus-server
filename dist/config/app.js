"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PHONE_REGEX = exports.SENIOR_SECTION = exports.JUNIOR_SECTION = exports.ROLES = exports.Role = exports.appConfig = void 0;
var dotenv = __importStar(require("dotenv"));
dotenv.config(); // { path: `.env.${process.env.NODE_ENV}` }
function getAppPath() {
    var currentDir = __dirname;
    currentDir = currentDir.replace("/config", "");
    return currentDir;
}
exports.appConfig = {
    node: process.env.NODE_ENV || "development",
    isProduction: process.env.NODE_ENV === "production",
    isStaging: process.env.NODE_ENV === "staging",
    isDevelopment: process.env.NODE_ENV === "development",
    name: process.env.APP_NAME,
    port: process.env.PORT || Number(4000),
    routePrefix: process.env.APP_ROUTE_PREFIX,
    url: process.env.APP_URL,
    databaseUrl: process.env.DATABASE_URL,
    jwtSecret: process.env.JWT_SECRET,
    jwtLifetime: "2d",
    apiPrefix: "/api/v1",
    host: process.env.HOST,
    corsAllowedOrigins: [process.env.HOST, process.env.DEV_HOST],
    cloudName: process.env.CLOUD_NAME,
    cloudApiSecret: process.env.CLOUD_API_SECRET,
    cloudApiKey: process.env.CLOUD_API_KEY,
};
var Role;
(function (Role) {
    Role["ADMIN"] = "admin";
    Role["STUDENT"] = "student";
    Role["TEACHER"] = "teacher";
})(Role || (exports.Role = Role = {}));
exports.ROLES = {
    ADMIN: "admin",
    STUDENT: "student",
    TEACHER: "teacher",
};
exports.JUNIOR_SECTION = ["JSS1", "JSS2", "JSS3"];
exports.SENIOR_SECTION = ["SSS1", "SSS2", "SSS3"];
//Regex
exports.PHONE_REGEX = /^[0-9\s+-.()]+$/;
//# sourceMappingURL=app.js.map