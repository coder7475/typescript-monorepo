import { readFileSync } from "node:fs";
import indexRouter from "@/routes";
import { mongoConnector } from "@repo/db";
import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";

import { env } from "./configs/envConfig";
import { middlewares } from "./middlewares";

const app: Express = express();

// Load OpenAPI spec
const openapiSpec = JSON.parse(readFileSync("./openapi.json", "utf8"));

// Connect to Database
mongoConnector(env.DB_URI).catch((err: Error) => console.error(err));

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

app.use("/api/v1", indexRouter);
app.use("/", (_req, res) => {
  return res.status(200).json({
    message: "Welcome to ____ System!",
  });
});

// Not found route handler
app.use(middlewares.notFoundRoute);
// Global error handler
app.use(middlewares.globalErrorHandler);

export default app;
