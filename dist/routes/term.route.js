"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var term_controller_1 = require("../controllers/term.controller");
var authentication_middleware_1 = require("../middlewares/authentication.middleware");
var check_role_middleware_1 = require("../middlewares/check-role.middleware");
var app_1 = require("../config/app");
var router = express_1.default.Router();
router.route("/current-term").get(authentication_middleware_1.auth, term_controller_1.getCurrentTerm);
router.route("/create-term").post(authentication_middleware_1.auth, (0, check_role_middleware_1.CheckRole)([app_1.ROLES.ADMIN]), term_controller_1.createTerm);
exports.default = router;
//# sourceMappingURL=term.route.js.map