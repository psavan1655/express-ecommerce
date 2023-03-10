import httpStatus from "http-status";
import { uploadFileToS3 } from "../../utils/aws-s3.js";

export const uploadFile = async (req, res) => {
  try {
    const uplaodedFileData = await uploadFileToS3(req.file);

    return res.success(uplaodedFileData.Location, httpStatus.OK);
  } catch (error) {
    console.log(chalk.red(error));
    return res.error({ message: error.message }, httpStatus.BAD_REQUEST);
  }
};
