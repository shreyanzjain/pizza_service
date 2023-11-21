import express from "express";

const app = express();
const port = 3004;

app.get("/", (req, res) => {
  res.status(200).send("Hello, Delivery");
});

app.listen(port, () => {
  console.log(`Delivery. Listening on http://localhost:${port}`);
});
