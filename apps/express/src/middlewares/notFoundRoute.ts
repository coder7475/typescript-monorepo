import type { Request, RequestHandler, Response } from "express";

const notFoundRoute: RequestHandler = (_req: Request, res: Response) => {
	res.status(404).json({
		success: false,
		message: `Not Found Route`,
	});
};

export default notFoundRoute;
