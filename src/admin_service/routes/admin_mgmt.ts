import express from "express";
const router = express.Router();

import { create_admin } from "../methods/admin_mgmt";
import authorization from "../middleware/auth";
import bodyParser from "body-parser";
const jsonParser = bodyParser.json();

async function create_first_admin(
  email: string = "admin@ds.com",
  password: string = "123456"
) {
  const response = await create_admin(email, password);
  if (response[0] == "200") {
    console.log(`Admin created with email: ${email} and password: ${password}`);
  }
}

create_first_admin();

router.post("/create", authorization, jsonParser, async (req, res) => {
  const email: string = req.body.email;
  const password: string = req.body.password;

  if (email && password) {
    const response = await create_admin(email, password);
    return res.status(parseInt(response[0])).send(response[1]);
  } else {
    return res.status(400).send("email or password not in req body");
  }
});

export default router;
