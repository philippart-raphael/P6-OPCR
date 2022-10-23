import mongoose from "mongoose";
import SauceSchema from "../models/SauceSchema";
import { SauceSchemaType } from "../models/SauceSchema.type";

export default class LikeControllerActions {
  private readonly sauceId: string;
  private readonly userId: string | mongoose.ObjectId;
  private readonly like: number;
  private usersLikedSauce: string[];
  private usersDislikedSauce: string[];

  constructor(
    sauceId: string,
    like: number,
    userId: string | mongoose.ObjectId,
    sauceUpdated: SauceSchemaType
  ) {
    this.sauceId = sauceId;
    this.like = like;
    this.userId = userId;
    this.usersLikedSauce = sauceUpdated.usersLiked;
    this.usersDislikedSauce = sauceUpdated.usersDisliked;
    this.action().then();
  }

  async action() {
    switch (this.like) {
      case 1:
        await this.addLike();
        break;
      case -1:
        await this.addDisLike();
        break;
      case 0:
        if (this.usersLikedSauce.includes(this.userId.toString())) {
          await this.deleteLike();
        }
        if (this.usersDislikedSauce.includes(this.userId.toString())) {
          await this.deleteDisLike();
        }
        break;
    }
  }

  async addLike() {
    return SauceSchema.updateOne(
      { _id: this.sauceId },
      {
        $inc: { likes: this.like },
        $push: { usersLiked: this.userId },
        _id: this.sauceId,
      }
    );
  }

  async addDisLike() {
    return SauceSchema.updateOne(
      { _id: this.sauceId },
      {
        $inc: { dislikes: this.like },
        $push: { usersDisliked: this.userId },
        _id: this.sauceId,
      }
    );
  }

  async deleteLike() {
    return SauceSchema.updateOne(
      { _id: this.sauceId },
      {
        $inc: { likes: this.like },
        $pull: { usersLiked: this.userId },
        _id: this.sauceId,
      }
    );
  }

  async deleteDisLike() {
    return SauceSchema.updateOne(
      { _id: this.sauceId },
      {
        $inc: { dislikes: this.like },
        $pull: { usersDisliked: this.userId },
        _id: this.sauceId,
      }
    );
  }
}
