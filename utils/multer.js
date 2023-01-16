import multer from "multer";
import {
  ALLOWED_MIME_TYPES,
  MAX_FILE_SIZE,
} from "../config/constants/multer.constants.js";

const fileFilter = (req, file, cb) => {
  if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const multerUploader = multer({
  fileFilter: fileFilter,
  limits: { fileSize: MAX_FILE_SIZE },
  // storage: multerS3({
  //   s3,
  //   bucket: process.env.AWS_BUCKET_NAME,
  //   acl: "public-read",
  //   contentType: multerS3.AUTO_CONTENT_TYPE,
  //   metadata: function (req, file, cb) {
  //     cb(null, { fieldName: file.fieldname });
  //   },
  //   key: function (req, file, cb) {
  //     cb(null, Date.now().toString());
  //   },
  // }),
});
