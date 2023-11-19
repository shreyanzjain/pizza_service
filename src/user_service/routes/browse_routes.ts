import view_restaurants from "../methods/browse_methods";

import express from "express";
const router = express.Router();

router.get("/", async (req, res) => {
  const page = (typeof req.query.page === "string"? parseInt(req.query.page): null)
  const restaurants = await view_restaurants("delhi", page);
  console.log(restaurants);
  return res.status(200).send(restaurants);
});

export default router;
