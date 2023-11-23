import { add_restaurant, del_restaurant } from "../methods/restaurant_mgmt";
import express from "express";
const router = express.Router();

import bodyParser from "body-parser";
const jsonParser = bodyParser.json();

router.post("/add_restaurant", jsonParser, async (req, res) => {
  const name = req.body.name;
  const city = req.body.city;
  const password = req.body.password;
  const email = req.body.email;

  const response = await add_restaurant(name, city, email, password);
  res.status(parseInt(response[0])).send(response[1]);
});

router.delete("/delete_restaurant", async (req, res) => {
  const id = typeof req.query.id === "string" ? parseInt(req.query.id) : null;
  const response = await del_restaurant(id);

  res.status(parseInt(response[0])).send(response[1]);
});

export default router;
