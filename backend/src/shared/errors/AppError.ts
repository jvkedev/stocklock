export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    statusCode: number = 500,
    isOperational: boolean = true,
  ) {
    super(message);

    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message: string = "Bad Request") {
    return new AppError(message, 400);
  }

  static unauthorized(message: string = "Unauthorized") {
    return new AppError(message, 401);
  }

  static forbidden(message: string = "Forbidden") {
    return new AppError(message, 403);
  }

  static notFound(message: string = "Resource Not Found") {
    return new AppError(message, 404);
  }

  static conflict(message: string = "Conflict") {
    return new AppError(message, 409);
  }

  static serverError(message: string = "Internal Server Error") {
    return new AppError(message, 500);
  }
}
