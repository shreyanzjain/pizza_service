import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const port = 3003;
app.use(cookieParser());
app.use(cors());

import menu_router from "./routes/menu";
import status_router from './routes/status';
import auth_router from './routes/auth';

app.get("/", (req, res) => {
  res.status(200).send("Hello, Restaurant");
});

app.use("/menu", menu_router);
app.use("/status", status_router);
app.use("/auth", auth_router);

app.listen(port, () => {
  console.log(`Restaurant. Listening on http://localhost:${port}`);
});
