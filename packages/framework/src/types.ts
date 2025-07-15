import { IncomingMessage } from "node:http";

/**
 * ? Methods: get, post, put, patch, delete
 */
export type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface Request {
  nodeReq: IncomingMessage;
  method: Method;
}
