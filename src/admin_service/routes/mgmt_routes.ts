import { add_restaurant, del_restaurant } from "../methods/restaurant_mgmt";
import express from "express";
const router = express.Router();

router.post("/add_restaurant", async (req, res) => {
  const name = typeof(req.query.name) === "string" ? req.query.name : null;
  const city = typeof(req.query.city) === "string" ? req.query.city : null;
  const password = typeof(req.query.password) === "string" ? req.query.password : null;

  console.log(name, city, password)
  const response = await add_restaurant(name, city, password);
  res.status(parseInt(response[0])).send(response[1]);
});

router.delete("/delete_restaurant", async (req, res) => {
  const id = typeof(req.query.id) === "string" ? parseInt(req.query.id) : null;
  const response = await del_restaurant(id);

  res.status(parseInt(response[0])).send(response[1]);
});

export default router;