import express from "express";

const router = express.Router();
import AuthRouter from "./routes/auth.route";
import UserRouter from "./routes/user.route";
import ReportRouter from "./routes/report.route";
import TermRouter from "./routes/term.route";
import AdmissionRouter from "./routes/admission.route";
import ClassRouter from "./routes/class.route";
import SubjectRouter from "./routes/subject.route";
// ----------------------------------------------------
// ---------------  API V1
// ----------------------------------------------------

router.use("/auth", AuthRouter);
router.use("/users", UserRouter);
router.use("/reports", ReportRouter);
router.use("/term", TermRouter);
router.use("/admission", AdmissionRouter);
router.use("/class", ClassRouter);
router.use("/subjects", SubjectRouter);
export default router;
