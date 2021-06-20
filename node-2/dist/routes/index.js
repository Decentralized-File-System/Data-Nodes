"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const v1_1 = __importDefault(require("./v1"));
const express_1 = require("express");
const router = express_1.Router();
router.use("/v1", v1_1.default);
exports.default = router;
