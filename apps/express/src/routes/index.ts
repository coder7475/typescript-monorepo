import { Router, type Request, type Response } from "express";

const indexRouter: Router = Router();

indexRouter.get("/", (_req: Request, res: Response) => {
  res.send("Hello from Express + TypeScript!");
});

export default indexRouter;
