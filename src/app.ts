import Initialization from "./start/Initialization";
import Fastify from "fastify";
import fastifyEnv from "@fastify/env";
import autoLoad from "@fastify/autoload";
import { schema } from "./config/envSetup";
import { setupDb } from "./config/dbSetup";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

// Initialization of the application for Create Uploads Folder
new Initialization();

const app = Fastify({
  ignoreTrailingSlash: true,
  ignoreDuplicateSlashes: true,
  logger: false,
});

app.register(fastifyEnv, {
  dotenv: true,
  schema,
});
app.register(cors, {});
app.register(autoLoad, {
  dir: path.join(__dirname, "routes"),
});

app.ready(async (err) => {
  if (err) app.log.error(err);

  try {
    await setupDb(app.config.DB_HOST);

    await app.listen({
      port: app.config.API_PORT,
      host: app.config.API_HOST,
    });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
});
