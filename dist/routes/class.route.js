"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var class_controller_1 = require("../controllers/class.controller");
var express_1 = require("express");
var router = (0, express_1.Router)();
router.route("/transfer").post(class_controller_1.moveToNextClass);
exports.default = router;
//# sourceMappingURL=class.route.js.map