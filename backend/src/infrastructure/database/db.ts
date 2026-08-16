import { Pool } from "pg";
import config from "../../config/config.js";
import { logger } from "../logger/logger.js";

export const db = new Pool({
  host: config.database.host,
  port: config.database.port,
  database: config.database.name,
  user: config.database.user,
  password: config.database.password,
});

export const connectDB = async () => {
  try {
    await db.query(`SELECT 1`);
    logger.info("Connected to the database");
  } catch (error) {
    logger.error({error}, "Failed to connect to the database");
    process.exit(1);
  }
};
