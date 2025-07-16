import type { NextFunction, Request, Response } from "express";
import type { ZodSchema } from "zod";

export const validateZod =
  (schema: ZodSchema<unknown>, source: "body" | "params" | "query" = "body") =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      return res.status(400).json({
        message: "Validation failed",
        success: false,
        error: result.error.errors,
      });
    }

    // overwrite with parsed data
    req[source] = result.data;
    next();
  };
