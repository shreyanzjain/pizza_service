import express from "express";
import cookieParser from 'cookie-parser';
import 'dotenv/config';

import browse_routes from "./routes/browse_routes";
import auth_routes from './routes/auth';

const app = express();
const port = 3002;

app.use(cookieParser());

app.get("/", (req, res) => {
  console.log("/");
  res.status(200).send("Hello, Customer");
});

app.use("/browse", browse_routes);
app.use("/auth", auth_routes);

app.listen(port, () => {
  console.log(`User. Listening on http://localhost:${port}`);
});
