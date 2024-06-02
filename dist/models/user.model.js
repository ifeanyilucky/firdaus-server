"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var crypto_1 = __importDefault(require("crypto"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var mongoose_1 = __importDefault(require("mongoose"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var app_1 = require("../config/app");
// -----------------------------------
var UserSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        required: [true, "Please provide first name"],
        maxLength: 50,
    },
    lastName: {
        type: String,
        required: [true, "Please provide last name"],
        maxLength: 50,
    },
    middleName: {
        type: String,
        maxLength: 50,
    },
    admissionNumber: String,
    email: {
        type: String,
        required: [true, "Please provide email"],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email",
        ],
        unique: true,
    },
    avatar: {
        type: String,
    },
    currentClass: {
        type: String,
        enum: [
            "FGKGC_001",
            "FGKGC_002",
            "FGNSC_001",
            "FGNSC_002",
            "FGBSC_001",
            "FGBSC_002",
            "FGBSC_003",
            "FGBSC_004",
            "FGBSC_005",
            "FGBSC_006",
            "FGJSC_001",
            "FGJSC_002",
            "FGJSC_002",
            "FGJSC_003",
            "FGSSC_001",
            "FGSSC_002",
            "FGSSC_003",
            "none",
        ],
    },
    teacherId: String,
    gender: {
        type: String,
        enum: ["male", "female"],
    },
    password: {
        type: String,
        minLength: 6,
        required: [true, "You must provide password"],
    },
    role: {
        type: String,
        enum: ["teacher", "student", "admin"],
        default: "student",
        required: [true, "Please specify role for this user"],
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active",
    },
    tel: {
        type: String,
        minLength: 10,
        maxLength: 11,
        trim: true,
        required: function () {
            return this.role === "teacher" ? true : false;
        },
    },
    parentPhone: {
        type: String,
        minLength: 10,
        maxLength: 11,
        trim: true,
        required: function () {
            return this.role === "student" ? true : false;
        },
    },
    teacherSignature: {
        type: String,
        // required: function (): boolean {
        //   // @ts-ignore
        //   return this.role === "teacher" ? true : false;
        // },
    },
    subjects: {
        type: Array,
        required: function () {
            // @ts-ignore
            return this.role === "student" ? true : false;
        },
    },
    subjectTaught: {
        type: String,
        // required: function (): boolean {
        //   // @ts-ignore
        //   return this.role === "teacher" ? true : false;
        // },
    },
    teacherType: {
        type: String,
        enum: ["subject_teacher", "class_teacher"],
        // required: function (): boolean {
        //   // @ts-ignore
        //   return this.role === "teacher" ? true : false;
        // },
    },
    classTeacher: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "User",
        // required: function (): boolean {
        //   // @ts-ignore
        //   return this.role === "student" ? true : false;
        // },
    },
    classHandled: {
        type: String,
        enum: [
            "FGJSC_001",
            "FGJSC_002",
            "FGJSC_002",
            "FGJSC_003",
            "FGSSC_001",
            "FGSSC_002",
            "FGSSC_003",
            "FGKGC_001",
            "FGKGC_002",
            "FGNSC_001",
            "FGNSC_002",
            "FGBSC_001",
            "FGBSC_002",
            "FGBSC_003",
            "FGBSC_004",
            "FGBSC_005",
            "FGBSC_006",
            "none",
        ],
    },
    department: {
        type: String,
        enum: ["science", "commercial", "art", "none"],
        default: "none",
    },
    passwordResetToken: String,
    passwordResetExpire: Date,
    reports: {
        type: [{ type: mongoose_1.default.Types.ObjectId, ref: "Report" }],
    },
}, { timestamps: true });
UserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function () {
        var salt, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!this.isModified("password")) {
                        next();
                    }
                    return [4 /*yield*/, bcryptjs_1.default.genSalt(10)];
                case 1:
                    salt = _b.sent();
                    _a = this;
                    return [4 /*yield*/, bcryptjs_1.default.hash(this.password, salt)];
                case 2:
                    _a.password = _b.sent();
                    next();
                    return [2 /*return*/];
            }
        });
    });
});
UserSchema.methods.createJwt = function () {
    return jsonwebtoken_1.default.sign({ userId: this._id, email: this.email, role: this.role }, app_1.appConfig.jwtSecret, { expiresIn: app_1.appConfig.jwtLifetime });
};
UserSchema.methods.comparePassword = function (candidatePassword) {
    return __awaiter(this, void 0, void 0, function () {
        var isMatch;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, bcryptjs_1.default.compare(candidatePassword, this.password)];
                case 1:
                    isMatch = _a.sent();
                    return [2 /*return*/, isMatch];
            }
        });
    });
};
UserSchema.methods.getResetPasswordToken = function () {
    var resetToken = crypto_1.default.randomBytes(20).toString("hex");
    this.passwordResetToken = crypto_1.default
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    this.passwordResetExpire = Date.now() + 10 * (1000 * 60);
    return resetToken;
};
exports.User = mongoose_1.default.model("User", UserSchema);
//# sourceMappingURL=user.model.js.map