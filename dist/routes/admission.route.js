"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var admission_controller_1 = require("../controllers/admission.controller");
var router = (0, express_1.Router)();
router.route("/create").post(admission_controller_1.createAdmission);
router.route("/get-all").get(admission_controller_1.getAdmissions);
router.route("/get-single").get(admission_controller_1.getAdmission);
exports.default = router;
//# sourceMappingURL=admission.route.js.map