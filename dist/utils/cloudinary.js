"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudUpload = void 0;
var cloudinary_1 = require("cloudinary");
var app_1 = require("../config/app");
cloudinary_1.v2.config({
    cloud_name: app_1.appConfig.cloudName,
    api_key: app_1.appConfig.cloudApiKey,
    api_secret: app_1.appConfig.cloudApiSecret,
});
var cloudUpload = function (file, folder) {
    return new Promise(function (resolve, reject) {
        cloudinary_1.v2.uploader.upload(file, function (error, result) {
            console.log(error);
            resolve(result.url);
        });
    });
};
exports.cloudUpload = cloudUpload;
//# sourceMappingURL=cloudinary.js.map