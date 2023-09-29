import express from "express";
import ffmpeg from "fluent-ffmpeg";

const app = express();
const port = process.env.PORT || 3000;

app.post("/process-video", (req, res) => {
  const inputFilePath = req.body.inputFilePath;
  const outputFilePath = req.body.outputFilePath;
  if (!inputFilePath || !outputFilePath) {
    res.status(400).send("Bad Request: Missing File Path");
  }
  ffmpeg(inputFilePath)
    .outputOptions("-vf", "scale=-1:360")
    .on("end", () => {
      res.status(200).send("Processing finished successfully");
    })
    .on("error", (error) => {
      console.log(`An error occurred: ${error.message}`);
      res.status(500).send(`Internal Server Error:${error.message}`);
    })
    .save(outputFilePath);
});

app.listen(port, () => {
  console.log(`Video processing service listening at http://localhost:${port}`);
});
