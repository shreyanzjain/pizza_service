import express from "express";
import browse_routes from "./routes/browse_routes";

const app = express();
const port = 3002;

app.get("/", (req, res) => {
  console.log("/");
  res.status(200).send("Hello, Customer");
});

app.use("/browse", browse_routes);

app.listen(port, () => {
  console.log(`User. Listening on http://localhost:${port}`);
});
