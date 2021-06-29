"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fileControllers_1 = require("../../controllers/fileControllers");
const connect_busboy_1 = __importDefault(require("connect-busboy"));
const router = express_1.Router();
router.use(connect_busboy_1.default({
    highWaterMark: 2 * 1024 * 1024, // Set 2MiB buffer
}));
router.post("/upload-file", fileControllers_1.uploadFile);
router.get("/download-file", fileControllers_1.downloadFile);
router.delete("/", fileControllers_1.deleteFile);
exports.default = router;
