import { createServer, IncomingMessage, ServerResponse } from "node:http";

const requestListener = (req: IncomingMessage, res: ServerResponse) => {
  const path = req.url;
  const method = req.method;

  console.log(`${method} ${path}`);

  res.writeHead(200, {
    "Content-Type": "text/plain",
  });
  res.write("Hello Node Server!");
  res.end();
};

// listen
const server = createServer(requestListener);

const port = 5000;

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
