"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFound = void 0;
var NotFound = function (req, res) {
    return res.status(404).send({ message: "Route does not exist", success: false });
};
exports.NotFound = NotFound;
//# sourceMappingURL=notfound.middleware.js.map