import express from "express";
const router = express.Router();
import bodyParser from "body-parser";
const jsonParser = bodyParser.json();

import authorization from "../middleware/auth";
import { upsert_profile } from "../methods/profile";

router.patch("/update", authorization, jsonParser, async (req, res) => {
  const { entity_id, role } = req;
  const name: string = req.body.name;
  const city: string = req.body.city;
  if (role === "RESTAURANT") {
    if (name || city) {
      const response = await upsert_profile(
        entity_id,
        name,
        city.toUpperCase()
      );
      return res.status(parseInt(response[0])).send(response[1]);
    } else {
      return res.status(400).send("name or city not in req body");
    }
  } else {
    return res.status(403).send("Unauthorized.");
  }
});

router.post("/create", authorization, jsonParser, async (req, res) => {
  const { entity_id, role } = req;
  const name: string = req.body.name;
  const city: string = req.body.city;
  if (role === "RESTAURANT") {
    if (name && city) {
      const response = await upsert_profile(
        entity_id,
        name,
        city.toUpperCase()
      );
      return res.status(parseInt(response[0])).send(response[1]);
    } else {
      return res.status(400).send("name and city not in req body");
    }
  } else {
    return res.status(403).send("Unauthorized.");
  }
});

export default router;
