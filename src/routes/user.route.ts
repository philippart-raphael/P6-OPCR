import { FastifyInstance } from "fastify";

export default async (app: FastifyInstance) => {
  app.post("/login", (req, res) => {
    console.log('Login: ', req.body);
    res.send({ login: true });
  });
  app.post("/signup", (req, res) => {
    console.log('Signup: ', req.body);
    res.send({ signup: true });
  });
};

export const autoPrefix = "/api/auth";
