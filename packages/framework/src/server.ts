import EventEmitter from "node:events";
import { createServer, IncomingMessage, ServerResponse } from "node:http";

import { RequestImp } from "./Request.js";
import { ResponseImp } from "./Response.js";

// Event Driven Server
export class Server extends EventEmitter {
  private server: ReturnType<typeof createServer>;

  // constructor
  constructor() {
    super();
    this.server = createServer(this.handleRequest.bind(this));
  }

  // methods
  public listen(port: number, cb?: () => void) {
    this.server.listen(port, cb);
  }

  private async handleRequest(
    nodeReq: IncomingMessage,
    nodeRes: ServerResponse<IncomingMessage>,
  ) {
    this.emit("request:received");

    // * Step 1: Process the request and response and create our own req, res object
    const request = new RequestImp(nodeReq);
    const response = new ResponseImp(nodeRes);

    // * Step 2: Parse the body
    await request.parseBody();

    // * Step 3: Match the Route

    // * Step 4: Execute the handler or Execute the middleware chain
    const body = {
      statusCode: 200,
      message: "Message from our own response handler!",
    };
    // send response
    response.status(200).json(body);
    this.emit("request:processed");
  }
}
