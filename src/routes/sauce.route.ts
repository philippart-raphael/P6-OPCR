import express, { Router } from "express";
import {
  createSauceController,
  readAllSauceController,
  readSauceController,
  updateSauceController,
  deleteSauceController,
} from "../controllers/CRUDSauceController";
import { authenticator } from "../middleware/authenticator";
import { likeController } from "../controllers/LikeController";
import multerConfig from "../middleware/multerConfig";

const RouterSauce: Router = express.Router();

RouterSauce.post("/sauces", authenticator, multerConfig, createSauceController);
RouterSauce.get("/sauces", authenticator, readAllSauceController);
RouterSauce.get("/sauces/:idSauce", authenticator, readSauceController);
RouterSauce.put(
  "/sauces/:idSauce",
  authenticator,
  multerConfig,
  updateSauceController
);
RouterSauce.delete("/sauces/:idSauce", authenticator, deleteSauceController);
RouterSauce.post("/sauces/:idSauce/like", authenticator, likeController);

export default RouterSauce;
