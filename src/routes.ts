import express from "express";

const router = express.Router();
import AuthRouter from "./routes/auth.route";

// ----------------------------------------------------
// ---------------  API V1
// ----------------------------------------------------

router.use("/auth", AuthRouter);
// router.use('',AuthRouter)

export default router;
