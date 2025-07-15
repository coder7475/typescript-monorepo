import { IncomingMessage } from "node:http";

/**
 * ? Methods: get, post, put, patch, delete
 */
export type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

// contract for request
export interface Request {
  nodeReq: IncomingMessage;
  method: Method;
  headers: Record<string, string>;
  path: string; // actual path post/1234
  originalPath: string; // template path post/:id
  query: Record<string, string>;
  params: Record<string, string>;
  body: string | Object | null;
}
