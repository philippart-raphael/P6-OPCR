import Initialization from "./start/Initialization";
import { setupDb } from "./config/dbSetup";
import RouterUser from "./routes/user.route";
import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

// Initialization of the application for Create Uploads Folder
new Initialization();

// Instanciation of the express application
const app = express();

const corsOptions = {
  origin: "*",
};

app.use(express.json());
app.use(cors(corsOptions));
// Make All Routes
app.use("/api/auth/", RouterUser);

// Connexion to the database
(async () => {
  try {
    await setupDb((<number | unknown>process.env.MONGO_URI_HOST) as string);
  } catch (e) {
    console.error(e);
  }
})();

if (<number | unknown>process.env.API_PORT) {
  app.listen((<number | unknown>process.env.API_PORT) as string, () =>
    console.log(
      ("API is running on port " +
        <number | unknown>process.env.API_PORT) as string
    )
  );
}
