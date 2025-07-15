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

  // listener
  private handleRequest(nodeReq: IncomingMessage, nodeRes: ServerResponse) {
    this.emit("request:received");

    this.emit("request:processed");
  }
}
