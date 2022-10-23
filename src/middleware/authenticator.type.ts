import { Request } from "express";
import Mongoose from "mongoose";

export interface AuthenticatorTypeRequest extends Request {
  authenticator?: { userId: Mongoose.ObjectId | string };
}
