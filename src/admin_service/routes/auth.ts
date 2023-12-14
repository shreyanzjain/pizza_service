import express from "express";
const router = express.Router();

import bodyParser from "body-parser";
import { login } from "../methods/auth";
import jwt from "jsonwebtoken";
import authorization from "../middleware/auth";
const jsonParser = bodyParser.json();

router.post("/login", jsonParser, async (req, res) => {
  const email: string = req.body.email;
  const password: string = req.body.password;

  if (email && password) {
    const response = await login(email, password);
    if (typeof response[1] === "object") {
      const token = jwt.sign(Object(response[1]), process.env.ENTITY_SECRET, {
        expiresIn: "7d",
      });

      return res
        .cookie("auth_token", token, {
          maxAge: 1000 * 60 * 60 * 24 * 7,
          httpOnly: true,
          sameSite: "lax",
        })
        .send("Logged in.");
    } else {
      return res
        .status(parseInt(typeof response[0] === "string" ? response[0] : null))
        .send(response[1]);
    }
  } else {
    return res.status(400).send("email, password not in req body");
  }
});

router.get("/logout", authorization, (req, res) => {
  return res.clearCookie("auth_token").send("Logged Out.");
});

export default router;
