import multer from "multer";
import fs from "fs";
import { Request, Express } from "express";

const storage = multer.diskStorage({
  destination: "/tmp",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const upload = multer({
  storage: storage,
  fileFilter(
    req: Request,
    file: Express.Multer.File,
    callback: multer.FileFilterCallback
  ) {
    if (!file) {
      callback(null, false);
    } else {
      callback(null, true);
    }
  },
});
