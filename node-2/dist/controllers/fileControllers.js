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
const fs_extra_1 = __importDefault(require("fs-extra"));
const uploadFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.pipe(req.busboy);
    const { fileId, index } = req.query;
    console.log(fileId);
    console.log(index);
    req.busboy.on("file", (fieldName, file, filename) => {
        console.log(`Upload of '${fileId}' started`);
        // Create a write stream of the new file
        const fStream = fs_extra_1.default.createWriteStream(`${__dirname}/../../files/${fileId}=${index}`);
        // Pipe it trough
        file.pipe(fStream);
        // On finish of the upload
        fStream.on("close", () => __awaiter(void 0, void 0, void 0, function* () {
            console.log(`Upload of '${fileId}' finished`);
            res.status(200).send("success");
        }));
        fStream.on("error", (err) => {
            res.status(500).json({ error: err });
        });
    });
});
exports.uploadFile = uploadFile;
const downloadFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fileId, index } = req.query;
    try {
        const buffer = yield fs_extra_1.default.readFile(`${__dirname}/../../files/${fileId}=${index}`);
        const base64 = buffer.toString("base64");
        console.log("buffer 2 finished");
        res.status(200).json(base64);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
    // res
    //   .status(200)
    //   .sendFile(`${__dirname}/../../files/${fileId}=${index}`, {}, (err) => {
    //     if (err) {
    //       return res.status(400).json({ error: err });
    //     }
    //   });
});
exports.downloadFile = downloadFile;
