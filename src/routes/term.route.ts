import express from "express";
import { createTerm, getCurrentTerm } from "../controllers/term.controller";
import { auth } from "../middlewares/authentication.middleware";
import { CheckRole } from "../middlewares/check-role.middleware";
import { ROLES } from "../config/app";

const router = express.Router();

router.route("/current-term").get(auth, getCurrentTerm);
router.route("/create-term").post(auth, CheckRole([ROLES.ADMIN]), createTerm);

export default router;
