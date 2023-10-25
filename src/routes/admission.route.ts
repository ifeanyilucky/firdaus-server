import { Router } from "express";
import {
  getAdmission,
  getAdmissions,
  createAdmission,
} from "../controllers/admission.controller";

const router = Router();

router.route("/create").post(createAdmission);
router.route("/get-all").get(getAdmissions);
router.route("/get-single").get(getAdmission);

export default router;
