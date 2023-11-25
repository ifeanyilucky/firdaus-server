import {
  addSubjects,
  findSubjects,
  removeSubject,
} from "../controllers/subject.controller";
import { auth } from "../middlewares/authentication.middleware";
import { Router } from "express";

const router = Router();

router.route("/add").post(auth, addSubjects);
router.route("/get/:id").get(auth, findSubjects);
router.route("/remove/:subject_code/:user_id").delete(auth, removeSubject);

export default router;
