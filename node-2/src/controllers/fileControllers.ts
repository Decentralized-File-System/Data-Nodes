import { Request, Response } from "express";
import fs from "fs-extra";

const uploadFile = async (req: Request, res: Response) => {
  req.pipe(req.busboy);
  const { fileId, index } = req.query;

  req.busboy.on("file", (fieldName, file, filename) => {
    console.log(`Upload of '${fileId}' started`);

    // Create a write stream of the new file
    const fStream = fs.createWriteStream(
      `${__dirname}/../../files/${fileId}=${index}`
    );
    // Pipe it trough
    file.pipe(fStream);

    // On finish of the upload
    fStream.on("close", async () => {
      console.log(`Upload of '${fileId}' finished`);
      res.status(200).send("success");
    });

    fStream.on("error", (err) => {
      res.status(500).json({ error: err });
    });
  });
};

const downloadFile = async (req: Request, res: Response) => {
  const { fileId } = req.query;
  res.status(200).download(`${__dirname}/../../files/${fileId}.json`, (err) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
  });
};

export { uploadFile, downloadFile };
