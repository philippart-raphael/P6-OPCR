import { Request, Response } from "express";
import { HydratedDocument } from "mongoose";
import { SauceSchemaType } from "../models/SauceSchema.type";
import SauceSchema from "../models/SauceSchema";

export const createSauceController = async (req: Request, res: Response) => {
  try {
    const sauce = JSON.parse(req.body.sauce);
    const file: Express.Multer.File = req.file!;
    delete sauce.userId;

    const sauceForDataBAse: HydratedDocument<SauceSchemaType> =
      await new SauceSchema({
        ...sauce,
        imageUrl: `${req.protocol}://${req.get("host")}/uploads/${
          file.filename
        }`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],
        // TODO Creation du middleware pour l'authentification'
        userId: "req.auth.userId",
      });

    await sauceForDataBAse.save();
    res.status(201).json({ message: "Sauce registered !" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};
