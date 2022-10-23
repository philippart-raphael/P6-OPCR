import Mongoose from "mongoose";
import { JwtPayload } from "jsonwebtoken";

export interface MyJwtPayload extends JwtPayload {
  userId: Mongoose.ObjectId | string;
}
