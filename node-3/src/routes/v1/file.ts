import { Router } from "express";
import { uploadFile, downloadFile } from "../../controllers/fileControllers";
import fileUpload from "express-fileupload";
const router = Router();

router.use(fileUpload());

router.post("/upload-file", uploadFile);
router.get("/download-file", downloadFile);

export default router;
