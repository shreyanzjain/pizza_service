import express from "express";
import mgmt_routes from './routes/mgmt_routes';

const app = express();
const port = 3001;

app.get("/", (req, res) => {
  console.log("/");
  res.status(200).send("Hello, Admin");
});

app.use('/admin', mgmt_routes);

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
