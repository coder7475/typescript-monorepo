import { Handler, Method } from "./types.js";

export class TrieNode {
  path: string = "";
  isEnd: boolean = false;
  method: Method = "GET";
  children: Map<string, TrieNode> = new Map();
  handlers: Map<Method, Handler> = new Map();
}

export class Router {
  private root: TrieNode = new TrieNode();

  add(method: Method, path: string, handler: Handler): void {
    const segments = path.split("/").filter(Boolean);
    if (segments.length === 0) return;

    let node = this.root;

    for (const segment of segments) {
      if (!node.children.has(segment)) {
        const newNode = new TrieNode();
        newNode.path = segment;
        node.children.set(segment, newNode);
      }

      node = node.children.get(segment)!;
    }
    node.isEnd = true;
    node.method = method;
    node.handlers.set(method, handler);
  }

  toString(): string {
    const routes: string[] = [];

    const traverse = (node: TrieNode, path: string = "") => {
      if (node.isEnd) {
        for (const [method, handler] of node.handlers) {
          routes.push(`${method.padEnd(6)} ${path} -> ${handler.name}`);
        }
      }
      for (const [segment, childNode] of node.children) {
        traverse(childNode, `${path}/${segment}`);
      }
    };

    traverse(this.root);

    return routes.length ? routes.join("\n") : "No route found!";
  }
}
