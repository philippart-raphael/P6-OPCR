import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import * as path from "path";
import { createServer } from "http";
import { fileURLToPath } from "url";
import Initialization from "./start/Initialization";
import { setupDb } from "./config/dbSetup";
import RouterUser from "./routes/user.route";
import RouterSauce from "./routes/sauce.route";

dotenv.config();

// Initialization of the application for Create Uploads Folder
new Initialization();

// Instanciation of the express application
const app = express();

const corsOptions = {
  allowedHeaders: [
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization",
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  origin: "*",
};

app.use(express.json());
app.use(cors(corsOptions));
// Make All Routes
app.use("/api/auth", RouterUser);
app.use("/api", RouterSauce);

// Connexion to the database
(async () => {
  try {
    await setupDb(<string>process.env.MONGO_URI_HOST);
  } catch (e) {
    console.error(e);
  }
})();

const server = createServer(app);

if (<number | unknown>process.env.API_PORT) {
  server.listen(<number | unknown>process.env.API_PORT, () =>
    console.log(
      "API is running on port " + <number | unknown>process.env.API_PORT
    )
  );
}
