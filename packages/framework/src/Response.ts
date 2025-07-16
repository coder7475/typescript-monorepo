import { IncomingMessage, ServerResponse } from "node:http";

import { Response } from "./types.js";

export class ResponseImp implements Response {
  statusCode: number = 200;
  headers: Record<string, string> = {};

  constructor(public nodeRes: ServerResponse<IncomingMessage>) {}
  // methods
  status(code: number): this {
    this.statusCode = code;
    return this;
  }
  setHeader(key: string, value: string): this {
    this.headers[key] = value;
    return this;
  }
  send(body?: string | Object | Buffer | null): this {
    if (this.nodeRes.writableEnded) return this;
  }
  json(body: Object): this {
    throw new Error("Not Implemented - json method");
  }
  // TODO - Add more methods here
}
