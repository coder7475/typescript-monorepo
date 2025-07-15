import { createApp } from "@repo/framework";

const app = createApp();

// listener
const port = 5555;
app.listen(port, () => {
  console.log(`Server is Running on port http://localhost:${port}!`);
});
