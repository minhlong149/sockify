const express = require("express");
const multer = require("multer");

const { uploadFile, getFileStream } = require("./s3");

const app = express();
const upload = multer();

app.use(express.static("dist"));

app.get("/images/:key", (request, response) => {
  const { key } = request.params;
  const readStream = getFileStream(key);
  readStream.pipe(response);
});

app.post("/api/images", upload.single("image"), async (request, response) => {
  try {
    const data = await uploadFile(request.file);
    response.status(201).json({ path: `/images/${data.Key}` });
  } catch (err) {
    console.error(err.message);
    response.status(500).json({ message: err.message });
  }
});

module.exports = app;
