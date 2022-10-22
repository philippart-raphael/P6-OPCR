import { Schema, model } from "mongoose";
import { SauceSchemaType } from "./SauceSchema.type";
// @ts-ignore
import mongooseErrors from "mongoose-errors";

const schema = {
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, required: true },
  dislikes: { type: Number, required: true },
  usersLiked: { type: [String], required: true },
  usersDisliked: { type: [String], required: true },
};

const SauceSchema = new Schema<SauceSchemaType>(schema, { versionKey: false });
SauceSchema.plugin(mongooseErrors);

export default model<SauceSchemaType>("Sauce", SauceSchema);
