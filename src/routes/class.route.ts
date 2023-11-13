import { moveToNextClass } from "../controllers/class.controller";
import { Router } from "express";

const router = Router();

router.route("/transfer").post(moveToNextClass);

export default router;
