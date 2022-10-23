import express, { Router } from "express";
import {
  loginController,
  signupController,
} from "../controllers/UserController";

const RouterUser: Router = express.Router();

RouterUser.post("/login", loginController);
RouterUser.post("/signup", signupController);

export default RouterUser;
