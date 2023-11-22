import express from "express";
const router = express.Router();

import { set_status } from "../methods/status";
import authorization from "../middleware/auth";

router.put("/set", authorization, async (req, res) => {
  const status =
    typeof req.query.status === "string"
      ? req.query.status.toUpperCase()
      : null;

  const restaurant_id: number = req.restaurant_id;

  if (status && restaurant_id) {
    if (status == "ONLINE" || status == "OFFLINE") {
      const response = await set_status(
        status == "ONLINE" ? 1 : 0,
        restaurant_id
      );
      return res.status(parseInt(response[0])).send(response[1]);
    } else {
      return res
        .status(400)
        .send("Please put status (OFFLINE or ONLINE) as a query parameter");
    }
  } else {
    return res
      .status(400)
      .send(
        "Please put status (OFFLINE or ONLINE) as a query parameter"
      );
  }
});

export default router;
