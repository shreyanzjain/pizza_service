import express from "express";
import authorization from "../middleware/auth";
const router = express.Router();

import { add_to_cart, get_cart } from "../methods/order";
import bodyParser from "body-parser";
const jsonParser = bodyParser.json();

router.post("/add_to_cart", authorization, jsonParser, async (req, res) => {
  const city: string = req.city;
  const customer_id: number = req.customer_id;
//   try {
    const item_id = req.body.item_id;
    if (item_id) {
      const response = await add_to_cart(
        item_id,
        customer_id,
        city,
      );
      return res.status(parseInt(response[0])).send(response[1]);
    } else {
      return res
        .status(400)
        .send("Send item_id in req body.");
    }
//   } catch {
//     return res.status(400).send("Send item_id & restaurant_id in req body.");
//   }
});

router.get('/cart', authorization, async (req, res)=> {
    const customer_id: number = req.customer_id;
    const response = await get_cart(customer_id);
    return res.status(200).send(response);
});

export default router;
