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

router.route("/").get(auth, getUsers);
router.route("/:id").get(auth, getUser);
router.route("/edit/:id").patch(auth, updateUser);
router.route("/create").post(auth, createUser);
router.route("/delete/:id").delete(auth, deleteUser);

export default router;
