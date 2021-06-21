import { Request, Response } from "express";
import fs from "fs";

const uploadFile = async (req: Request, res: Response) => {
  //@ts-ignore
  const buffer = req.files.file.data;
  const data = JSON.parse(buffer.toString());
  const writableStream = fs.createWriteStream(
    `${__dirname}/../../files/${data.fileId}.json`
  );

  writableStream.write(JSON.stringify(data), (err) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: err });
    } else {
      console.log("success");
      res.status(200).json({ message: "Success uploading file" });
    }
  });

  // fs.writeFile(
  //   `${__dirname}/../../files/${data.fileId}.json`,
  //   JSON.stringify(data),
  //   (err) => {
  //     if (err) {
  //       res.status(500).json({ error: err });
  //     } else {
  //       console.log("success");
  //       res.status(200).json({ message: "Success uploading file" });
  //     }
  //   }
  // );
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
