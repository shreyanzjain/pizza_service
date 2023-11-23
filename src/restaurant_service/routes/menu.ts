import express from "express";
import bodyParser from "body-parser";
const jsonParser = bodyParser.json();
const router = express.Router();


import { add_item, get_menu, update_item, remove_item } from "../methods/menu";
import authorization from "../middleware/auth";

router.get("/get_menu", authorization, async (req, res) => {
  const restaurant_id: number = req.restaurant_id;
  const response = await get_menu(restaurant_id);
  return res.status(parseInt(String(response[0]))).send(response[1]);
});

router.get("/public", jsonParser, async(req, res)=> {
  const restaurant_id = typeof req.query.restaurant_id === "string" ? parseInt(req.query.restaurant_id) : null;
  const response = await get_menu(restaurant_id);
  return res.status(parseInt(String(response[0]))).send(response[1]);
});

router.post("/add_item", authorization, jsonParser, async (req, res) => {
  const restaurant_id: number = req.restaurant_id;
  const name = req.body.name ? req.body.name : null;
  const price = req.body.price ? req.body.price : null;

  if (restaurant_id && name && price) {
    const response = await add_item(name, price, restaurant_id);
    return res.status(parseInt(response[0])).send(response[1]);
  } else {
    return res
      .status(400)
      .send(
        "Did you forget to send any of the fields? (name, price)"
      );
  }
});

router.put("/update_item", authorization, jsonParser, async (req, res) => {
  const restaurant_id: number = req.restaurant_id;
  const id = req.body.id ? req.body.id : null;
  const name = req.body.name ? req.body.name : null;
  const price = req.body.price ? req.body.price : null;

  if (id) {
    const response = await update_item(id, restaurant_id, name, price);
    return res.status(parseInt(response[0])).send(response[1]);
  } else {
    return res.status(400).send("Please send the item's id & the fields that you want to update - [, name] [, price] in the request body");
  }
});

router.delete("/delete_item", authorization, jsonParser, async (req, res) => {
  const restaurant_id: number = req.restaurant_id;
  const id = typeof req.query.id === "string" ? parseInt(req.query.id) : null;
  if (id) {
    const response = await remove_item(id, restaurant_id);
    return res.status(parseInt(response[0])).send(response[1]);
  } else {
    return res.status(400).send("Please send the id as a query parameter");
  }
});

export default router;
