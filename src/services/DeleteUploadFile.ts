import fs from "fs";
import path from "path";
import { Request } from "express";

export default function DeleteUploadFile(req: Request, file: string) {
  const nameFile = file.replace(`${req.protocol}://${req.get("host")}`, "");
  const pathFile = `${path.join(
    path.dirname(path.dirname(__dirname))
  )}${nameFile}`;

  fs.unlink(pathFile, (error) => {
    if (error) console.error(error);
  });
}
