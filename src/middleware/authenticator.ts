import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { AuthenticatorTypeRequest } from "../middleware/authenticator.type";
import JsonWebToken  from "../services/JsonWebToken";

export const authenticator = async (req: AuthenticatorTypeRequest, res: Response, next: NextFunction) => {
  try {
    const jwt = req.headers.authorization!.split(" ")[1];
    const decode : JwtPayload["userId"] | string | undefined = await JsonWebToken.verify(jwt);
    const userId: JwtPayload["userId"] = decode!.userId;

    req.authenticator = { userId };
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};
