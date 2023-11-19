import express from "express";

const app = express();
const port = 3003;

import menu_router from "./routes/menu";
import status_router from './routes/status';

app.get("/", (req, res) => {
  res.status(200).send("Hello, Restaurant");
});

app.use("/menu", menu_router);
app.use("/status", status_router);

app.listen(port, () => {
  console.log(`Restaurant. Listening on http://localhost:${port}`);
});
