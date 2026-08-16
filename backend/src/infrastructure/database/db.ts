import { Pool } from "pg";
import config from "../../config/config.js";

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
    console.log("Connected to the database");
  } catch (error) {
    console.error("Database connection error", error);
    process.exit(1);
  }
};
