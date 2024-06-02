"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var authentication_middleware_1 = require("../middlewares/authentication.middleware");
var auth_controller_1 = require("../controllers/auth.controller");
var router = express_1.default.Router();
router.route("/login").post(auth_controller_1.login);
router.route("/register").post(auth_controller_1.register);
router.route("/account").get(authentication_middleware_1.auth, auth_controller_1.account);
exports.default = router;
//# sourceMappingURL=auth.route.js.map