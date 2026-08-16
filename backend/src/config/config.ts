import dotenv from "dotenv";
import z from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),

  DB_HOST: z.string(),
  DB_PORT: z.coerce.number().default(5432),
  DB_USER: z.string(),
  DB_NAME: z.string(),
  DB_PASSWORD: z.string(),
});

const parsedEnv = () => {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    console.error("Invalid environment variable");
    console.error(result.error.issues);
    process.exit(1);
  }

  return result.data;
};

const env = parsedEnv();

const config = {
  port: env.PORT,

  database: {
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    name: env.DB_NAME,
    password: env.DB_PASSWORD
  }
};

export default config;
