import { Router } from "express";

import userRoutes from "./users.routes";

const indexRouter: Router = Router();

const moduleRoutes = [
	{
		path: "user",
		routes: userRoutes,
	},
];

moduleRoutes.forEach((route) => {
	indexRouter.use(route.path, route.routes);
});

export default indexRouter;
