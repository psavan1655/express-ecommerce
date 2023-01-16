import * as dotenv from "dotenv";
dotenv.config();
import aws from "aws-sdk";

export const uploadFileToS3 = async (file) => {
  try {
    const s3 = new aws.S3();

    const param = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `uploads/${new Date().toISOString()}-${file.originalname}`,
      Body: file.buffer,
      ACL: "public-read",
    };

    return await s3.upload(param).promise();
  } catch (error) {
    console.log(chalk.bgRed(error));
    throw error;
  }
};
