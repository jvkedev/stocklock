import dotenv from "dotenv";
import z from "zod";
import type { StringValue } from "ms";

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),

  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  LOG_LEVEL: z
    .enum(["fatal", "error", "warn", "info", "debug", "trace"])
    .default("info"),

  DB_HOST: z.string(),
  DB_PORT: z.coerce.number().default(5432),
  DB_USER: z.string(),
  DB_NAME: z.string(),
  DB_PASSWORD: z.string(),

  ACCESS_TOKEN_SECRET: z.string().min(32),
  ACCESS_TOKEN_EXPIRES_IN: z
    .string()
    .default("15m")
    .transform((value) => value as StringValue),

  REFRESH_TOKEN_SECRET: z.string().min(32),
  REFRESH_TOKEN_EXPIRES_IN: z
    .string()
    .default("7d")
    .transform((value) => value as StringValue),
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

  nodeEnv: env.NODE_ENV,
  logLevel: env.LOG_LEVEL,

  database: {
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    name: env.DB_NAME,
    password: env.DB_PASSWORD,
  },

  auth: {
    accessTokenSecret: env.ACCESS_TOKEN_SECRET,
    accessTokenExpiresIn: env.ACCESS_TOKEN_EXPIRES_IN,
    refreshTokenSecret: env.REFRESH_TOKEN_SECRET,
    refreshTokenExpiresIn: env.REFRESH_TOKEN_EXPIRES_IN,
  },
};

export default config;
