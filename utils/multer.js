import multer from "multer";
import {
  ALLOWED_MIME_TYPES,
  MAX_FILE_SIZE,
} from "../config/constants/multer.constants.js";

const fileFilter = (req, file, cb) => {
  console.log(MAX_FILE_SIZE);
  if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const multerUploader = multer({
  dest: "uploads/",
  fileFilter: fileFilter,
  limits: { fileSize: MAX_FILE_SIZE },
});
