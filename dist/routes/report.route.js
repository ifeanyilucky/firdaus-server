"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var report_controller_1 = require("../controllers/report.controller");
var authentication_middleware_1 = require("../middlewares/authentication.middleware");
var check_role_middleware_1 = require("../middlewares/check-role.middleware");
var app_1 = require("../config/app");
var router = express_1.default.Router();
router.route("/").get(authentication_middleware_1.auth, report_controller_1.getReports);
router.route("/create").post(authentication_middleware_1.auth, (0, check_role_middleware_1.CheckRole)([app_1.ROLES.TEACHER]), report_controller_1.createReport);
router.route("/single/:id").get(authentication_middleware_1.auth, report_controller_1.getReport);
router.route("/download").get(authentication_middleware_1.auth, report_controller_1.downloadReport);
router.route("/delete/:id").delete(report_controller_1.deleteReport);
router.route("/update/:id").patch(authentication_middleware_1.auth, report_controller_1.updateReport);
exports.default = router;
//# sourceMappingURL=report.route.js.map