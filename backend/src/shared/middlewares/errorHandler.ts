import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError.js";
import { logger } from "../../infrastructure/logger/logger.js";
import config from "../../config/config.js";

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof SyntaxError && "body" in err) {
    logger.warn(
      {
        err,
        path: req.originalUrl,
        method: req.method,
        statusCode: 400,
      },
      "Invalid JSON payload",
    );

    return res.status(400).json({
      success: false,
      message: "Invalid JSON payload",
    });
  }

  const isAppError = err instanceof AppError;
  const statusCode = isAppError ? err.statusCode : 500;
  const isOperational = isAppError ? err.isOperational : false;

  const logContext = {
    err,
    path: req.originalUrl,
    method: req.method,
    statusCode,
    isOperational,
  };

  if (isOperational && statusCode < 500) {
    logger.warn(logContext, err.message);
  } else {
    logger.error(logContext, "Critical or unhandled error encountered");
  }

  const responseMessage =
    !isOperational && config.nodeEnv === "production"
      ? "Internal server error"
      : err.message || "Internal server error";

  res.status(statusCode).json({
    status: "error",
    message: responseMessage,
    ...(config.nodeEnv === "development" && { stack: err.stack }),
  });
};
