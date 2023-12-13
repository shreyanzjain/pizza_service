import { add_restaurant, del_restaurant } from "../methods/restaurant_mgmt";
import express from "express";
const router = express.Router();

import bodyParser from "body-parser";
const jsonParser = bodyParser.json();
import authorization from "../middleware/auth";

router.post("/add_restaurant", authorization, jsonParser, async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const response = await add_restaurant(email, password);
  res.status(parseInt(response[0])).send(response[1]);
});

router.delete("/delete_restaurant", authorization, async (req, res) => {
  const id = typeof req.query.id === "string" ? parseInt(req.query.id) : null;
  const response = await del_restaurant(id);

  res.status(parseInt(response[0])).send(response[1]);
});

export default router;
