import { JwtPayload, SignOptions, sign, verify } from "jsonwebtoken";
import { MyJwtPayload } from "~/services/JsonWebToken.type";

export default class JsonWebToken {
  static async sign(
    payload: MyJwtPayload,
    options: SignOptions
  ): Promise<MyJwtPayload | string | undefined> {
    try {
      return sign(payload, <string>process.env.SECRET_JWT, options);
    } catch (error) {
      console.error(error);
    }
  }

  static async verify(token: string): Promise<JwtPayload | string | undefined> {
    try {
      return verify(token, <string>process.env.SECRET_JWT);
    } catch (error) {
      console.error(error);
    }
  }
}
