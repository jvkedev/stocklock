import app from "./app.js";
import config from "./config/config.js";
import { logger } from "./infrastructure/logger/logger.js";
import { connectDB } from "./infrastructure/database/db.js";

const startServer = async () => {
  await connectDB();

  app.listen(config.port, () => {
    logger.info(`Server is running on port ${config.port}`);
  });
};

startServer();
