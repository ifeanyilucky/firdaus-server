"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var auth_route_1 = __importDefault(require("./routes/auth.route"));
var user_route_1 = __importDefault(require("./routes/user.route"));
var report_route_1 = __importDefault(require("./routes/report.route"));
var term_route_1 = __importDefault(require("./routes/term.route"));
var admission_route_1 = __importDefault(require("./routes/admission.route"));
var class_route_1 = __importDefault(require("./routes/class.route"));
var subject_route_1 = __importDefault(require("./routes/subject.route"));
// ----------------------------------------------------
// ---------------  API V1
// ----------------------------------------------------
router.use("/auth", auth_route_1.default);
router.use("/users", user_route_1.default);
router.use("/reports", report_route_1.default);
router.use("/term", term_route_1.default);
router.use("/admission", admission_route_1.default);
router.use("/class", class_route_1.default);
router.use("/subjects", subject_route_1.default);
exports.default = router;
//# sourceMappingURL=routes.js.map