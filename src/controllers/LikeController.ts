import { Response } from "express";
import { HydratedDocument } from "mongoose";
import { AuthenticatorTypeRequest } from "../middleware/authenticator.type";
import LikeControllerActions from "../controllers/LikeControllerActions";
import SauceSchema from "../models/SauceSchema";

export const likeController = async (
  req: AuthenticatorTypeRequest,
  res: Response
) => {
  try {
    const userId = req.authenticator!.userId;
    const userLike = req.body.like;
    const sauceId = req.params.idSauce;
    const sauceUpdated: HydratedDocument<any> = await SauceSchema.findById(
      sauceId
    );

    new LikeControllerActions(sauceId, userLike, userId, sauceUpdated);
    res.status(200).json({ message: "Sauce update" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};
