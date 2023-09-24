import express from "express";

const router = express.Router();
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.controller";
import { auth } from "../middlewares/authentication.middleware";
import { CheckRole } from "../middlewares/check-role.middleware";
import { ROLES, Role } from "../config/app";

router.route("/").get(auth, getUsers);
router.route("/single/:id").get(auth, getUser);
router.route("/edit/:id").patch(auth, updateUser);
router
  .route("/create")
  .post(auth, CheckRole([ROLES.ADMIN, ROLES.TEACHER]), createUser);
router.route("/delete/:id").delete(auth, deleteUser);

export default router;
