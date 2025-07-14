import { logger } from "@/app";
import { env } from "@/configs/envConfig";
import type { ErrorRequestHandler, NextFunction, Request, Response } from "express";

const globalErrorHandler: ErrorRequestHandler = (err, _req: Request, res: Response, _next: NextFunction) => {
	const statusCode: number = err.statusCode ?? 500;
	const message: string = err.message ?? "Internal Server Error";

	logger.error(err);

	res.status(statusCode).json({
		success: false,
		message,
		stack: env.NODE_ENV === "production" ? undefined : err.stack,
	});
};

export default globalErrorHandler;
