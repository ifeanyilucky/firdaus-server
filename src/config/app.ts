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
  port: Number(4000),
  routePrefix: process.env.APP_ROUTE_PREFIX,
  url: process.env.APP_URL,
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  jwtLifetime: "2d",
};
