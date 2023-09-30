import express from "express";
import ffmpeg from "fluent-ffmpeg";
import {
  setupDirectories,
  downloadRawVideo,
  convertVideo,
  uploadProcessedVideo,
  deleteRawVideo,
  deleteProcessedVideo,
} from "./storage";

setupDirectories();

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/process-video", async (req, res) => {
  let data;
  try {
    const message = Buffer.from(req.body.message.data, "base64").toString(
      "utf8"
    );
    data = JSON.parse(message);
    if (!data.name) {
      throw new Error("Invalid message payload received.");
    }
  } catch (error) {
    console.error(error);
    return res.status(400).send(`Bad Request: missing fileName`);
  }
  const inputFileName = data.name;
  const outputFileName = `processed-${inputFileName}`;
  await downloadRawVideo(inputFileName);
  try {
    await convertVideo(inputFileName, outputFileName);
  } catch (error) {
    await Promise.all([
      deleteRawVideo(inputFileName),
      deleteProcessedVideo(outputFileName),
    ]);

    console.error(error);
    return res
      .status(500)
      .send(`Internal Server Error: video processing failed`);
  }
  await uploadProcessedVideo(outputFileName);
  await Promise.all([
    deleteRawVideo(inputFileName),
    deleteProcessedVideo(outputFileName),
  ]);
  return res.status(200).send("ok");
});

app.listen(port, () => {
  console.log(`Video processing service listening at http://localhost:${port}`);
});
