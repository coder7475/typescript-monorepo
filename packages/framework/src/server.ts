import EventEmitter from "node:events";
import { createServer, IncomingMessage, ServerResponse } from "node:http";

import { RequestImp } from "./Request.js";
import { ResponseImp } from "./Response.js";
import { Router } from "./Router.js";
import { Handler } from "./types.js";

// Event Driven Server
export class Server extends EventEmitter {
  private server: ReturnType<typeof createServer>;
  private router: Router;
  // constructor
  constructor() {
    super();
    this.server = createServer(this.handleRequest.bind(this));
    this.router = new Router();
  }

  // methods
  public listen(port: number, cb?: () => void) {
    this.server.listen(port, cb);
  }

  public get(path: string, handler: Handler) {
    this.router.add("GET", path, handler);
  }

  public post(path: string, handler: Handler) {
    this.router.add("POST", path, handler);
  }

  public put(path: string, handler: Handler) {
    this.router.add("PUT", path, handler);
  }

  public patch(path: string, handler: Handler) {
    this.router.add("PATCH", path, handler);
  }

  public delete(path: string, handler: Handler) {
    this.router.add("DELETE", path, handler);
  }

  private async handleRequest(
    nodeReq: IncomingMessage,
    nodeRes: ServerResponse<IncomingMessage>,
  ) {
    // * Step 1: Process the request and response and create our own req, res object
    const request = new RequestImp(nodeReq);
    const response = new ResponseImp(nodeRes);

    // * Step 2: Parse the body
    await request.parseBody();

    // * Step 3: Match the Route
    const matchedResult = this.router.match(request.method, request.path);

    if (!matchedResult) {
      response.status(404).json({
        status: "error",
        message: "Route Not found!",
      });
      return;
    }

    const { handler: finalHandler, originalPath, params } = matchedResult;
    request.params = params;
    request.originalPath = originalPath;

    // * Step 4: Execute the handler or Execute the middleware chain
    finalHandler(request, response);
  }
}

/*** Routes->
 * * /home - handler A [home]
 * * /admin/dashboard - Handler B [admin, dashboard]
 * *  /admin/dashboard/users - Handler C [admin, dashboard, users]
 * * /products/:id - [products, :id] - products/123 - [products, 123]
 * * /products/:id/comments/:cid - [products, :id, comments, :cid] - products/123/comments/423 - [products, 123, comments, 423]
 */
// ? Route Matching DS: Radix Tree
