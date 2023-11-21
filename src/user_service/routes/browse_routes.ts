import express from "express";
const router = express.Router();

import view_restaurants from "../methods/browse";
import authorization from "../middleware/auth";

router.get("/", authorization, async (req, res) => {
  const page =
    typeof req.query.page === "string" ? parseInt(req.query.page) : null;

  const restaurants = await view_restaurants(req.city, page);
  return res.status(200).send(restaurants);
});

export default router;
