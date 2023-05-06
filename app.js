const express = require("express");
const multer = require("multer");

const { uploadFile } = require("./s3");

const app = express();
const upload = multer();

app.use(express.static("dist"));

app.get("/api/images", (request, response) => {});

app.get("/api/images/:id", (request, response) => {});

app.post("/api/images", upload.single("image"), async (request, response) => {
  try {
    const data = await uploadFile(request.file);
    response.status(201).json(data);
  } catch (err) {
    console.error(err.message);
    response.status(500).json({ message: err.message });
  }
});

module.exports = app;
