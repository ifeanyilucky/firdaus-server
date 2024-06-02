"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subject = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var subject = new mongoose_1.default.Schema({
    name: String,
    code: String,
    id: String,
});
var SubjectsSchema = new mongoose_1.default.Schema({
    subjects: [subject],
    user_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Please provide a student for this subject"],
    },
    department: String,
}, { timestamps: true });
exports.Subject = mongoose_1.default.model("Subject", SubjectsSchema);
//# sourceMappingURL=subject.model.js.map