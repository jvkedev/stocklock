import express from "express";
import cors from "cors";
import authRoutes from "./features/auth/auth.routes.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/auth", authRoutes);

export default app;
