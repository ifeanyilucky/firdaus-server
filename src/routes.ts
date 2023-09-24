import express from "express";

const router = express.Router();
import AuthRouter from "./routes/auth.route";
import UserRouter from "./routes/user.route";
import ReportRouter from "./routes/report.route";

// ----------------------------------------------------
// ---------------  API V1
// ----------------------------------------------------

router.use("/auth", AuthRouter);
router.use("/users", UserRouter);
router.use("/reports", ReportRouter);

export default router;
