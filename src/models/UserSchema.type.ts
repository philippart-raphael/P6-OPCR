import mongoose from "mongoose";

export interface UserSchemaType {
  email: string;
  password: string;
}

export interface UserDataBaseSchemaType {
  _id: mongoose.ObjectId;
  email: string;
  password: string;
}
