import view_restaurants from "../methods/browse";

import express from "express";
const router = express.Router();

router.get("/", async (req, res) => {
  const page = (typeof req.query.page === "string"? parseInt(req.query.page): null)
  const restaurants = await view_restaurants("goa", page);
  console.log(restaurants);
  return res.status(200).send(restaurants);
});

export default router;
