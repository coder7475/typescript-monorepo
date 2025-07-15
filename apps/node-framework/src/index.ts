import { createServer, IncomingMessage, ServerResponse } from "node:http";

const requestListener = (req: IncomingMessage, res: ServerResponse) => {
  const path = req.url;
  const method = req.method;

  console.log(`${method} ${path}`);

  const response: Record<string, any> = {};

  if (path?.startsWith("api/v1")) {
    response.statusCode = 200;
  }

  res.writeHead(200, {
    "Content-Type": "Application/json",
  });
  res.write(JSON.stringify(response));
  res.end();
};

// listen
const server = createServer(requestListener);

const port = 5000;

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
