import { Request, Response } from "express";
import { HydratedDocument } from "mongoose";
import { SauceSchemaType } from "../models/SauceSchema.type";
import { AuthenticatorTypeRequest } from "../middleware/authenticator.type";
import SauceSchema from "../models/SauceSchema";

export const createSauceController = async (req: AuthenticatorTypeRequest, res: Response) => {
  try {
    const sauce = JSON.parse(req.body.sauce);
    const file: Express.Multer.File = req.file!;
    delete sauce.userId;

    const sauceForDataBAse: HydratedDocument<SauceSchemaType> =
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

    await sauceForDataBAse.save();
    res.status(201).json({ message: "Sauce registered !" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

export const readAllSauceController = async (req: Request, res: Response) => {
  try {
    const allSauces = await SauceSchema.find();
    res.status(200).json(allSauces);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
}
