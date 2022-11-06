import { Request, Response } from "express";
import { HydratedDocument } from "mongoose";
import { SauceSchemaType } from "../models/SauceSchema.type";
import { AuthenticatorTypeRequest } from "../middleware/authenticator.type";
import DeleteUploadFile from "../services/DeleteUploadFile";
import UserAuthenticatorValidator from "../validators/UserAuthenticatorValidator";
import SauceSchema from "../models/SauceSchema";

export const createSauceController = async (
  req: AuthenticatorTypeRequest,
  res: Response
) => {
  try {
    const sauce = JSON.parse(req.body.sauce);
    const file: Express.Multer.File = req.file!;
    delete sauce.userId;

    const sauceForDataBase: HydratedDocument<SauceSchemaType> =
      await new SauceSchema({
        userId: req.authenticator!.userId,
        ...sauce,
        imageUrl: `${req.protocol}://${req.get("host")}/uploads/${
          file.filename
        }`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],
      });

    await sauceForDataBase.save();
    res.status(201).json({ message: "Sauce registered !" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

export const readAllSauceController = async (
  req: AuthenticatorTypeRequest,
  res: Response
) => {
  try {
    const allSauces: HydratedDocument<any> = await SauceSchema.find();
    res.status(200).json(allSauces);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

export const readSauceController = async (
  req: AuthenticatorTypeRequest,
  res: Response
) => {
  try {
    const sauce: HydratedDocument<any> = await SauceSchema.findById(
      req.params.idSauce
    );
    res.status(200).json(sauce);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

export const updateSauceController = async (
  req: AuthenticatorTypeRequest,
  res: Response
) => {
  if (!UserAuthenticatorValidator.validate(req, req.body.userId)) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  let body;

  try {
    if (req.file) {
      const sauce: HydratedDocument<any> = await SauceSchema.findById(
        req.params.idSauce
      );
      DeleteUploadFile(req, sauce.imageUrl);

      body = JSON.parse(req.body.sauce);
      body.imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
      }`;
    } else {
      body = req.body;
    }

    await (<HydratedDocument<any>>(
      SauceSchema.updateOne(
        { _id: req.params.idSauce },
        { ...body, _id: req.params.idSauce }
      )
    ));

    res.status(200).json({ message: "Sauce updated !" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

export const deleteSauceController = async (req: Request, res: Response) => {
  if (!UserAuthenticatorValidator.validate(req, req.body.userId)) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const sauce: HydratedDocument<any> = await SauceSchema.findById(
      req.params.idSauce
    );
    DeleteUploadFile(req, sauce.imageUrl);

    await (<HydratedDocument<any>>(
      SauceSchema.deleteOne({ _id: req.params.idSauce })
    ));

    res.status(200).json({ message: "Sauce deleted !" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};
