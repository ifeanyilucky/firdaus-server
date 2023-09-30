import { v2 } from "cloudinary";
import { appConfig } from "../config/app";
v2.config({
  cloud_name: appConfig.cloudName,
  api_key: appConfig.cloudApiKey,
  api_secret: appConfig.cloudApiSecret,
});

export const cloudUpload = (file: string, folder: string) => {
  return new Promise((resolve, reject) => {
    v2.uploader.upload(file, (error: any, result: any) => {
      console.log(error);
      resolve(result.url);
    });
  });
};
