import type { Request, Response } from "express";
import { Router } from "express";

const userRoutes: Router = Router();

//** root:  api/v1/user
userRoutes.get("/register", (_req: Request, res: Response) => {
	res.json({
		status: 200,
		message: "This is user register route",
	});
});

export default userRoutes;
