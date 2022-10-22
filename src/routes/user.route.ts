import express from "express";
import {
  loginController,
  signupController,
} from "../controllers/loginController";

const Router = express.Router();

Router.post("/login", loginController);
Router.post("/signup", signupController);

export default Router;
