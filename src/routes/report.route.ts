import express from "express";
import {
  createReport,
  deleteReport,
  downloadReport,
  getReport,
  getReports,
  updateReport,
} from "../controllers/report.controller";
import { auth } from "../middlewares/authentication.middleware";
import { CheckRole } from "../middlewares/check-role.middleware";
import { ROLES } from "../config/app";

const router = express.Router();

router.route("/").get(auth, getReports);
router.route("/create").get(auth, CheckRole(ROLES.TEACHER), createReport);
router.route("/:id").get(auth, getReport);
router.route("/download/:id").get(auth, downloadReport);
router.route("/delete/:id").delete(deleteReport);
router.route("/update/:id").patch(auth, updateReport);

export default router;
