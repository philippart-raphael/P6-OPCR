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

// Control ENV VARIABLES
const errorsENVMessage = ' is not defined in your .env file, { .env.example } is a template';

try {
  if (!process.env.UPLOADS_DIR) console.error('ERROR: UPLOADS_DIR' + errorsENVMessage);
  if (!process.env.API_PORT) console.error('ERROR: API_PORT' + errorsENVMessage);
  if (!process.env.MONGO_URI) console.error('ERROR: MONGO_URI' + errorsENVMessage);
  if (!process.env.SECRET_JWT) console.error('ERROR: SECRET_JWT' + errorsENVMessage);
} catch (error) {
  console.error(error);
  process.exit(1);
}

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
app.use(express.static(path.join(path.dirname(__dirname))));
app.use("/api/auth", RouterUser);
app.use("/api", RouterSauce);

// Connexion to the database
(async () => {
  try {
    await setupDb(<string>process.env.MONGO_URI);
  } catch (e) {
    console.error(e);
  }
})();

// Create and listen the API server
const server = createServer(app);
server.listen(<number | unknown>process.env.API_PORT, () =>
  console.log(
    "API is running on port " + <number | unknown>process.env.API_PORT,
  ),
);
