import { logger } from "@/app";
import { env } from "@/configs/envConfig";
import type { ErrorRequestHandler, NextFunction, Request, Response } from "express";

import AppError from "./AppError";

const globalErrorHandler: ErrorRequestHandler = (err, _req: Request, res: Response, _next: NextFunction) => {
	let statusCode: number = err.statusCode ?? 500;
	let message: string = err.message ?? `Error: ${err.message}`;
	// log the errror
	logger.error(err);

	if (err instanceof AppError) {
		statusCode = err.statusCode;
		message = err.message;
	}

	res.status(statusCode).json({
		success: false,
		message,
		stack: env.NODE_ENV === "production" ? undefined : err.stack,
	});
};

export default globalErrorHandler;
