import fileRouter from "./file";
import { Router } from "express";

const router = Router();

router.use("/file", fileRouter);

export default router;
