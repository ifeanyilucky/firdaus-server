import express from "express";
import {
  deleteReport,
  downloadReport,
  getReport,
  getReports,
  updateReport,
} from "../controllers/report.controller";
import { auth } from "../middlewares/authentication.middleware";

const router = express.Router();

router.route("/").get(auth, getReports);
router.route("/:id").get(auth, getReport);
router.route("/download/:id").get(auth, downloadReport);
router.route("/delete/:id").delete(deleteReport);
router.route("/update/:id").patch(auth, updateReport);

export default router;
