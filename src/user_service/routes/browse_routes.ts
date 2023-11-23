import express from "express";
const router = express.Router();
import axios from "axios";

import view_restaurants from "../methods/browse";
import authorization from "../middleware/auth";

router.get("/", authorization, async (req, res) => {
  const page =
    typeof req.query.page === "string" ? parseInt(req.query.page) : null;

  const restaurant_id =
    typeof req.query.restaurant_id === "string"
      ? parseInt(req.query.restaurant_id)
      : null;
  if (restaurant_id) {
    // if restaurant id is given as a query parameter
    const response = await axios.get(
      `http://localhost:3003/menu/public?restaurant_id=${restaurant_id}`,
      {
        withCredentials: true,
      }
    );
    if (response.data[0]) {
      return res.status(200).send(response.data);
    } else {
      return res.status(404).send("No such restaurant, or the restaurant is yet to add items to its menu.");
    }
  }
  const restaurants = await view_restaurants(req.city, page);
  return res.status(200).send(restaurants);
});

export default router;
