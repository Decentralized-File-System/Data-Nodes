"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const file_1 = __importDefault(require("./file"));
const express_1 = require("express");
const router = express_1.Router();
router.use("/file", file_1.default);
exports.default = router;
