import express from "express";
import { auth } from "../middlewares/authentication.middleware";
import { account, login, register } from "../controllers/auth.controller";

const router = express.Router();
router.route("/login").post(login);
router.route("/register").post(register);
router.route("/account").get(auth, account);

export default router;
