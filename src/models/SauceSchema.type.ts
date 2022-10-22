import mongoose from "mongoose";

export interface SauceSchemaType {
  userId: string;
  name: string;
  manufacturer: string;
  description: string;
  mainPepper: string;
  imageUrl: string;
  heat: number;
  likes: number;
  dislikes: number;
  usersLiked: string[];
  usersDisliked: string[];
}

export interface SauceDataBaseSchemaType {
  _id: mongoose.ObjectId;
  userId: string;
  name: string;
  manufacturer: string;
  description: string;
  mainPepper: string;
  imageUrl: string;
  heat: number;
  likes: number;
  dislikes: number;
  usersLiked: string[];
  usersDisliked: string[];
}
