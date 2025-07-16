import { logger } from "@/app";
import { env } from "@/configs/envConfig";
import type {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";

import AppError from "../configs/AppError";

const GlobalErrorHandler: ErrorRequestHandler = (
  err,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  let statusCode: number = err.statusCode ?? 500;
  let message: string = err.message ?? `Error: ${err.message}`;
  // log the error
  logger.error(err);

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof Error) {
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    stack: env.NODE_ENV === "production" ? undefined : err.stack,
  });
};

export default GlobalErrorHandler;
