import express from "express";

const router = express.Router();
import AuthRouter from "./routes/auth.route";
import UserRouter from "./routes/user.route";

// ----------------------------------------------------
// ---------------  API V1
// ----------------------------------------------------

router.use("/auth", AuthRouter);
router.use("/users", UserRouter);
// router.use('',AuthRouter)

export default router;
