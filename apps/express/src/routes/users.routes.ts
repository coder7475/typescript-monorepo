import { Router, type Request, type Response } from "express";

const userRoute: Router = Router();

userRoute.get("/", (_req: Request, res: Response) => {
  res.json({
    status: 200,
    message: "This is users route",
  });
});

export default userRoute;
