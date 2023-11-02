import express from "express";

const router = express.Router();
import {
  changePassword,
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.controller";
import { auth } from "../middlewares/authentication.middleware";
import { CheckRole } from "../middlewares/check-role.middleware";
import { ROLES, Role } from "../config/app";
import { upload } from "../utils/multer";

router.route("/").get(auth, getUsers);
router.route("/single/:id").get(auth, getUser);
router.route("/edit/:id").patch(auth, updateUser);
router.route("/change-password").put(auth, changePassword);
router
  .route("/create")
  .post(auth, upload.single("teacherSignature"), createUser);
router.route("/delete/:id").delete(auth, deleteUser);

export default router;
