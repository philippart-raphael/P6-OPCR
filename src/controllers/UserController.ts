import { Request, Response } from "express";
import { HydratedDocument } from "mongoose";
import {
  UserSchemaType,
  UserDataBaseSchemaType,
} from "../models/UserSchema.type";
import { hashPassword, verifyPassword } from "../services/PasswordHashing";
import JsonWebToken from "../services/JsonWebToken";
import UserValidator from "../validators/UserValidator";
import { MyJwtPayload } from "../services/JsonWebToken.type";
import UserSchema from "../models/UserSchema";

export const signupController = async (req: Request, res: Response) => {
  const userValid: UserValidator = new UserValidator(<UserSchemaType>req.body);

  if (userValid.email === true && userValid.password === true) {
    try {
      req.body.password = await hashPassword(req.body.password);
      const user: HydratedDocument<UserSchemaType> = new UserSchema(req.body);

      await user.save();
      res.status(201).json({ message: "User registered !" });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Bad request" });
    }
  } else {
    res.status(400).json({ message: "Bad request" });
  }
};

export const loginController = async (req: Request, res: Response) => {
  const userValid: UserValidator = new UserValidator(<UserSchemaType>req.body);

  if (userValid.email === true && userValid.password === true) {
    try {
      const userInDatabase: UserDataBaseSchemaType | null =
        await UserSchema.findOne({ email: req.body.email });

      if (!userInDatabase) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      if (userInDatabase) {
        const passwordIsValid: boolean | undefined = await verifyPassword(
          userInDatabase.password,
          req.body.password
        );

        if (!passwordIsValid) {
          res.status(401).json({ message: "User not found" });
          return;
        }

        const JWTToken: MyJwtPayload | string | undefined =
          await JsonWebToken.sign(
            { userId: userInDatabase._id },
            { expiresIn: "24h" }
          );
        res.status(200).json({ userId: userInDatabase._id, token: JWTToken });
      }
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Bad request" });
    }
  } else {
    res.status(400).json({ message: "Bad request" });
  }
};
