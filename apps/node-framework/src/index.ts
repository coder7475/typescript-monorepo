import { Server } from "@repo/framework/server";

const server = new Server();

// events
server.on("request:received", () => {
  console.log("Request Received!");
});

server.on("request:processed", () => {
  console.log("Request Processed!");
});

// listener
const port = 5555;
server.listen(port, () => {
  console.log(`Server is Running on port http://localhost:${port}!`);
});
