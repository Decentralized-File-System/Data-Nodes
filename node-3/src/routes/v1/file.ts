import { Router } from "express";
import {
  uploadFile,
  downloadFile,
  deleteFile,
} from "../../controllers/fileControllers";
import busboy from "connect-busboy";

const router = Router();

router.use(
  busboy({
    highWaterMark: 2 * 1024 * 1024, // Set 2MiB buffer
  })
);

router.post("/upload-file", uploadFile);
router.get("/download-file", downloadFile);
router.delete("/", deleteFile);

export default router;
