import express from "express";
import { multerUploader } from "../utils/multer.js";
import { uploadFile } from "../controllers/misc/file.controller.js";
const router = express.Router();

router.post("/upload", multerUploader.single("file"), uploadFile);

export default router;
