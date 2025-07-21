import { createApp, router } from "@repo/framework";

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

// add to router
router.add("GET", "/", () => {});
router.add("GET", "/home", () => {});
router.add("POST", "/login", () => {});
router.add("GET", "/admin/dashboard", () => {});
router.add("GET", "/products/:id", () => {});
router.add("GET", "/products/:id/comments/:cid", () => {});
console.log(router.toString());
console.log(router.match("GET", "/home"));
