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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSubject = exports.removeSubject = exports.findSubjects = exports.addSubjects = exports.createSubject = void 0;
var subject_service_1 = require("../services/subject.service");
var http_status_codes_1 = require("http-status-codes");
var createSubject = function (req, res) { };
exports.createSubject = createSubject;
var addSubjects = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, subjects, user_id, subject;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, subjects = _a.subjects, user_id = _a.user_id;
                return [4 /*yield*/, (0, subject_service_1.SubjectService)().addSubjects({
                        user_id: user_id,
                        subjects: subjects,
                    })];
            case 1:
                subject = _b.sent();
                res.status(http_status_codes_1.StatusCodes.ACCEPTED).json({ success: true, data: subject });
                return [2 /*return*/];
        }
    });
}); };
exports.addSubjects = addSubjects;
var findSubjects = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id, subjects;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user_id = req.params.user_id;
                return [4 /*yield*/, (0, subject_service_1.SubjectService)().getAllSubjects({
                        user_id: user_id,
                    })];
            case 1:
                subjects = _a.sent();
                res.status(http_status_codes_1.StatusCodes.ACCEPTED).json({ success: true, data: subjects });
                return [2 /*return*/];
        }
    });
}); };
exports.findSubjects = findSubjects;
var removeSubject = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, user_id, subject_code, subjects;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, user_id = _a.user_id, subject_code = _a.subject_code;
                return [4 /*yield*/, (0, subject_service_1.SubjectService)().deleteSubject({
                        user_id: user_id,
                        subject_code: subject_code,
                    })];
            case 1:
                subjects = _b.sent();
                res.status(http_status_codes_1.StatusCodes.ACCEPTED).json({ success: true, data: subjects });
                return [2 /*return*/];
        }
    });
}); };
exports.removeSubject = removeSubject;
var updateSubject = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var subjects, user_id, updatedSubjects;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                subjects = req.body.subjects;
                user_id = req.params.user_id;
                return [4 /*yield*/, (0, subject_service_1.SubjectService)().updateSubjects({
                        user_id: user_id,
                        subjects: subjects,
                    })];
            case 1:
                updatedSubjects = _a.sent();
                res
                    .status(http_status_codes_1.StatusCodes.ACCEPTED)
                    .json({ success: true, data: updatedSubjects });
                return [2 /*return*/];
        }
    });
}); };
exports.updateSubject = updateSubject;
//# sourceMappingURL=subject.controller.js.map