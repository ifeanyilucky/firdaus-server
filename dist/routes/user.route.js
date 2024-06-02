"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var user_controller_1 = require("../controllers/user.controller");
var authentication_middleware_1 = require("../middlewares/authentication.middleware");
var multer_1 = require("../utils/multer");
router.route("/").get(authentication_middleware_1.auth, user_controller_1.getUsers);
router.route("/single/:id").get(authentication_middleware_1.auth, user_controller_1.getUser);
router
    .route("/edit/:id")
    .patch(authentication_middleware_1.auth, multer_1.upload.single("teacherSignature"), user_controller_1.updateUser);
router.route("/change-password").put(authentication_middleware_1.auth, user_controller_1.changePassword);
router
    .route("/change-password-for-student/:id")
    .put(authentication_middleware_1.auth, user_controller_1.adminChangeStudentPassword);
router
    .route("/create")
    .post(authentication_middleware_1.auth, multer_1.upload.single("teacherSignature"), user_controller_1.createUser);
router.route("/delete/:id").delete(authentication_middleware_1.auth, user_controller_1.deleteUser);
router.route("/multi-users").post(authentication_middleware_1.auth, user_controller_1.createMultiUsers);
exports.default = router;
//# sourceMappingURL=user.route.js.map