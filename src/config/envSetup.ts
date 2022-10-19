interface IEnvSchema {
  type: "object";
  required: string[];
  properties: Record<string, { type: string }>;
}

export const schema: IEnvSchema = {
  type: "object",
  required: ["API_PORT", "API_HOST", "DB_HOST"],
  properties: {
    API_PORT: {
      type: "number",
    },
    API_HOST: {
      type: "string",
    },
    DB_HOST: {
      type: "string",
    },
  },
};

declare module "fastify" {
  interface FastifyInstance {
    config: {
      API_PORT: number;
      API_HOST: string;
      DB_HOST: string;
    };
  }
}
