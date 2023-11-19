import express from "express";

const app = express();
const port = 3003;

app.get("/", (req, res) => {
  res.status(200).send("Hello, Restaurant");
});

app.listen(port, () => {
    console.log(`Restaurant. Listening on http://localhost:${port}`)
})