import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import config from "./config/config.js";

import authRoutes from "./features/auth/auth.routes.js";
import productRoutes from "./features/products/product.routes.js";
import orderRoutes from "./features/orders/order.routes.js";
import { errorHandler } from "./shared/middlewares/errorHandler.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: config.frontend_url,
    credentials: true,
  }),
);

app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

app.use(errorHandler);

export default app;
