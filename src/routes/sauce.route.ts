import express, { Router } from "express";
import { createSauceController } from "../controllers/createSauceController";
import multerConfig from "../middleware/multerConfig";

const RouterSauce: Router = express.Router();

RouterSauce.post("/sauces", multerConfig, createSauceController);

export default RouterSauce;
