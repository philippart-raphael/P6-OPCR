import jsonwebtoken, { JwtPayload } from "jsonwebtoken";
import * as Mongoose from "mongoose";

export interface MyJwtPayload {
  userId: Mongoose.ObjectId;
}

export default class JsonWebToken {
  static async sign(
    payload: MyJwtPayload,
    options: jsonwebtoken.SignOptions
  ): Promise<string | undefined> {
    try {
      return jsonwebtoken.sign(payload, <string>process.env.SECRETJWT, options);
    } catch (error) {
      console.error(error);
    }
  }

  static async verify(token: string): Promise<JwtPayload | string | undefined> {
    try {
      return jsonwebtoken.verify(token, <string>process.env.SECRETJWT);
    } catch (error) {
      console.error(error);
    }
  }
}
