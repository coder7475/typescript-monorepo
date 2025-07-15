import EventEmitter from "node:events";
import { createServer, IncomingMessage, ServerResponse } from "node:http";

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

  private handleRequest(nodeReq: IncomingMessage, nodeRes: ServerResponse) {
    this.emit("request:received");

    // * Step 1: Process the request and response and create our own req, res object

    // * Step 2: Parse the body

    // * Step 3: Match the Route

    // * Step 4: Execute the handler or Execute the middleware chain
    const response = {
      statusCode: 200,
      message: "Hello World!",
    };

    nodeRes.writeHead(200, {
      "Content-Type": "Application/json",
    });
    nodeRes.write(JSON.stringify(response));
    nodeRes.end();

    this.emit("request:processed");
  }
}
