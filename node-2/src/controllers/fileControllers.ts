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

//Downloading file from node
const downloadFile = async (req: Request, res: Response) => {
  const { fileId, index } = req.query;
  try {
    const buffer = await fs.readFile(
      `${__dirname}/../../files/${fileId}=${index}`
    );
    const base64 = buffer.toString("base64");
    res.status(200).json(base64);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteFile = async (req: Request, res: Response) => {
  const { fileId }: any = req.query;
  try {
    const files = fs.readdirSync(`${__dirname}/../../files`);
    const filesToDelete = files.map((fileName) => {
      if (fileName.includes(fileId)) {
        return fileName;
      }
    });
    const filtered = filesToDelete.filter((str) => str != undefined);
    filtered.forEach((file) => {
      fs.unlinkSync(`${__dirname}/../../files/${file}`);
    });
    res.status(200).json({ message: "Success deleting" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting" });
  }
};

export { uploadFile, downloadFile, deleteFile };
