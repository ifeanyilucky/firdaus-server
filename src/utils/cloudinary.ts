import { v2 } from "cloudinary";

v2.config({
  cloud_name: "",
  api_key: "",
  api_secret: "",
});

export const uploads = (file: any, folder: any) => {
  console.log(file);
  console.log(folder);
  return new Promise((resolve) => {
    v2.uploader.upload(file, (result: any) => resolve(result.url));
  });
};
