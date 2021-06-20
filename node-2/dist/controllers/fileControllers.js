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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadFile = exports.uploadFile = void 0;
const fs_1 = __importDefault(require("fs"));
const uploadFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const buffer = req.files.file.data;
    const data = JSON.parse(buffer.toString());
    fs_1.default.writeFile(`${__dirname}/../../files/${data.fileId}.json`, JSON.stringify(data), (err) => {
        if (err) {
            res.status(500).json({ error: err });
        }
        else {
            console.log("success");
            res.status(200).json({ message: "Success uploading file" });
        }
    });
});
exports.uploadFile = uploadFile;
const downloadFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fileId } = req.query;
    res.status(200).download(`${__dirname}/../../files/${fileId}.json`, (err) => {
        if (err) {
            return res.status(400).json({ error: err });
        }
    });
});
exports.downloadFile = downloadFile;
