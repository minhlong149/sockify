require("dotenv").config();

const AWS = require("aws-sdk");
const s3 = new AWS.S3()

function uploadFile(file) {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: `${Date.now().toString()}-${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };
  return s3.upload(params).promise();
}

function getFileStream(fileKey) {
  const params = {
    Key: fileKey,
    Bucket: process.env.AWS_S3_BUCKET,
  };
  return s3.getObject(params).createReadStream();
}

exports.uploadFile = uploadFile;
exports.getFileStream = getFileStream;
