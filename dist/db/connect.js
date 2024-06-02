"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDb = void 0;
var mongoose = require("mongoose");
function connectDb(uri) {
    return mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}
exports.connectDb = connectDb;
//# sourceMappingURL=connect.js.map