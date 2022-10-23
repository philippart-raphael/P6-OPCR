import { Request } from "express";
import multer from "multer";
import crypto from "crypto";
import {
  DestinationCallback,
  FileNameCallback,
} from "~/middleware/multerConfig.type";

const MIMETYPES: any = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: DestinationCallback
  ) => {
    cb(null, process.env.DIR_UPLOADS!);
  },
  filename: (req: Request, file: Express.Multer.File, cb: FileNameCallback) => {
    const fileName = file.originalname.split(" ").join("_").split(".")[0];
    const FileExtension = MIMETYPES[file.mimetype];
    const uuid = crypto.randomUUID();

    cb(null, `${fileName}-${uuid}.${FileExtension}`);
  },
});

export default multer({ storage }).single("image");
