import { middlewares } from "@/middlewares";
import indexRouter from "@/routes";
import userRoute from "@/routes/users.routes";
import { connectToMongoDB } from "@repo/db";
import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";

const app: Express = express();

// Connect to Database
connectToMongoDB(process.env.DB_URI as string).catch((err: Error) =>
  console.error(err),
);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

// Routes
app.use("/", indexRouter);
app.use("/users", userRoute);

// Not found route handler
app.use(middlewares.notFoundRoute);
// Global error handler
app.use(middlewares.globalErrorHandler);

export default app;

