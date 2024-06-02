"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var subject_controller_1 = require("../controllers/subject.controller");
var authentication_middleware_1 = require("../middlewares/authentication.middleware");
var express_1 = require("express");
var router = (0, express_1.Router)();
router.route("/add").post(authentication_middleware_1.auth, subject_controller_1.addSubjects);
router.route("/get/:user_id").get(authentication_middleware_1.auth, subject_controller_1.findSubjects);
router.route("/remove/:subject_code/:user_id").delete(authentication_middleware_1.auth, subject_controller_1.removeSubject);
router.route("/update/:user_id").put(authentication_middleware_1.auth, subject_controller_1.updateSubject);
exports.default = router;
//# sourceMappingURL=subject.route.js.map