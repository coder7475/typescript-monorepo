import { Middleware } from "./types.js";

/**
 * - Global Middleware
 * - Route Middleware: path
 */
type MiddlewareEntry = {
  path?: string;
  middleware: Middleware;
};

export class MiddlewareManager {
  private middlewares: MiddlewareEntry[] = [];

  use(pathOrMiddleware: string | Middleware, middleware?: Middleware) {
    // Route Level Middleware
    if (typeof pathOrMiddleware === "string") {
      if (!middleware) return;
      this.middlewares.push({
        path: pathOrMiddleware,
        middleware,
      });
      return;
    }

    // Global middleware
    this.middlewares.push({ middleware: pathOrMiddleware });
  }
}
