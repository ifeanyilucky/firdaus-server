import * as dotenv from "dotenv";
dotenv.config(); // { path: `.env.${process.env.NODE_ENV}` }

import { toBool } from "../utils/to-bool";

function getAppPath() {
  let currentDir = __dirname;
  currentDir = currentDir.replace("/config", "");

  return currentDir;
}

export const appConfig = {
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

export enum Role {
  ADMIN = "admin",
  STUDENT = "student",
  TEACHER = "teacher",
}

export const ROLES = {
  ADMIN: "admin",
  STUDENT: "student",
  TEACHER: "teacher",
};

export const JUNIOR_SECTION = ["JSS1", "JSS2", "JSS3"];
export const SENIOR_SECTION = ["SSS1", "SSS2", "SSS3"];

//Regex
export const PHONE_REGEX = /^[0-9\s+-.()]+$/;
