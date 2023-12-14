import express from "express";
import cookieParser from "cookie-parser";
import mgmt_routes from "./routes/restaurant_mgmt";
import admin_routes from "./routes/admin_mgmt";
import auth_routes from "./routes/auth";

const app = express();
const port = 3001;
app.use(cookieParser());

app.get("/", (req, res) => {
  console.log("/");
  res.status(200).send("Hello, Admin");
});

app.use("/restaurant", mgmt_routes);
app.use("/", admin_routes);
app.use("/auth", auth_routes);

app.listen(port, () => {
  console.log(`Admin. Listening on http://localhost:${port}`);
});
