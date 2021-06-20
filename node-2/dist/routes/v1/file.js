"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fileControllers_1 = require("../../controllers/fileControllers");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const router = express_1.Router();
router.use(express_fileupload_1.default());
router.post("/upload-file", fileControllers_1.uploadFile);
router.get("/download-file", fileControllers_1.downloadFile);
exports.default = router;
