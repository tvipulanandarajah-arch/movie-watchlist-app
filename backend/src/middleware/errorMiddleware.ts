import { Request, Response, NextFunction } from 'express';

// Custom error class with statusCode support
export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    // Restore prototype chain (TypeScript requirement)
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

// 404 Not Found handler — for undefined routes
export const notFound = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const error = new AppError(`Route not found: ${req.originalUrl}`, 404);
  next(error);
};

// Global error handler — must have 4 params for Express to recognize it
export const errorHandler = (
  err: AppError | Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void => {
  const statusCode =
    err instanceof AppError ? err.statusCode : 500;

  const message = err.message || 'Internal Server Error';

  console.error(`❌ [${statusCode}] ${message}`);

  res.status(statusCode).json({
    success: false,
    message,
    // Show stack trace only in development
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};