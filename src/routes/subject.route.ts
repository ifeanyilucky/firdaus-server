import {
  addSubjects,
  findSubjects,
  removeSubject,
  updateSubject,
} from "../controllers/subject.controller";
import { auth } from "../middlewares/authentication.middleware";
import { Router } from "express";

const router = Router();

router.route("/add").post(auth, addSubjects);
router.route("/get/:user_id").get(auth, findSubjects);
router.route("/remove/:subject_code/:user_id").delete(auth, removeSubject);
router.route("/update/:user_id").put(auth, updateSubject);
export default router;
