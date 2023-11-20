import view_restaurants from "../methods/browse";

import express from "express";
const router = express.Router();

router.get("/", async (req, res) => {
  const city = typeof req.query.city === "string" ? req.query.city : null;
  const page =
    typeof req.query.page === "string" ? parseInt(req.query.page) : null;
  if (city) {
    const restaurants = await view_restaurants(city, page);
    return res.status(200).send(restaurants);
  } else  {
    return res.status(400).send("Send city as request query parameter.")
  }
});

export default router;
