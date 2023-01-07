import express from "express";
import { multerUploader } from "../utils/multer.js";
const router = express.Router();

router.post("/upload", multerUploader.single("file"), (req, res) =>
  console.log("Hey ther", req.file)
);

export default router;
