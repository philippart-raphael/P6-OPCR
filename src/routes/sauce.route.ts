import express, { Router } from "express";
import {
  createSauceController,
  readAllSauceController,
} from "../controllers/CRUDSauceController";
import { authenticator } from "../middleware/authenticator";
import multerConfig from "../middleware/multerConfig";

const RouterSauce: Router = express.Router();

RouterSauce.post("/sauces", authenticator, multerConfig, createSauceController);
RouterSauce.get("/sauces", authenticator, readAllSauceController);

export default RouterSauce;
