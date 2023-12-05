import express from "express";
const router = express.Router();
import jwt from "jsonwebtoken";
import { login } from "../methods/auth";
import bodyParser = require("body-parser");
import authorization from "../middleware/auth";
const jsonParser = bodyParser.json();
// 1. restaurant login
// 2. create restaurant

router.post("/login", jsonParser, async (req, res) => {
  const email: string = req.body.email;
  const password: string = req.body.password;
  if (email && password) {
    if (email.length <= 1 || email.length > 64) {
      return res
        .status(400)
        .send("Length of email has to be between 1 - 64 characters.");
    }
    const response = await login(email, password);
    if (typeof response[1] === "object" ) {
      const token = jwt.sign(response[1], process.env.ENTITY_SECRET, {
        expiresIn: "7d",
      });

      return res
        .status(parseInt(typeof response[0] === 'string'? response[0] : null))
        .cookie("auth_token", token, {
          maxAge: 1000 * 60 * 60 * 24 * 7,
        })
        .send("Logged In.");
    } else {
      return res.status(parseInt(typeof response[0] === 'string'? response[0] : null)).send(response[1]);
    }
  } else {
    return res
      .status(400)
      .send("Please send email and password in the req body.");
  }
});

router.get("/logout", authorization, (req, res) => {
  res.clearCookie("auth_token").status(200).send("Successfully logged out!");
});

export default router;
