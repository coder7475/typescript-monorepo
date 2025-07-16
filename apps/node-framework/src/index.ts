import { createApp } from "@repo/framework";

const app = createApp();
// events
app.on("request:received", () => {
  console.log("Server Request Received!");
});

app.on("request:processed", () => {
  console.log("Server Request Processed!");
});
// listener
const port = 5555;
app.listen(port, () => {
  console.log(`Server is Running on port http://localhost:${port}!`);
});
