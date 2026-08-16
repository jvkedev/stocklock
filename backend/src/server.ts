import app from "./app.js";
import config from "./config/config.js";
import { connectDB } from "./infrastructure/database/db.js";

const startServer = async () => {
  await connectDB();

  app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
  });
};

startServer();
