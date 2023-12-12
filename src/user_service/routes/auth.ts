// Signup
// Login

import express from "express";
const router = express.Router();
import bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
import jwt = require("jsonwebtoken");

import { register, login } from "../methods/auth";
import authorization from "../middleware/auth";

router.post("/register", jsonParser, async (req, res) => {
  const email: string = req.body.email;
  const password: string = req.body.password;
  const name: string = req.body.name;
  const city: string = req.body.city;

  if (!(email && password && name && city)) {
    return res
      .status(400)
      .send(
        "Please send email, name, city, and password in request body to signup."
      );
  }

  const response = await register(email, password, name, city);
  return res.status(parseInt(response[0])).send(response[1]);
});

router.post("/login", jsonParser, async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!(email && password)) {
    return res.status(400).send("Please send email and password");
  }

  const response = await login(email, password);
  if (typeof response === "object") {
    const token = jwt.sign(response, process.env.ENTITY_SECRET, {
      expiresIn: "7d",
    });
    return res
      .cookie("auth_token", token, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24 * 7,
      })
      .status(200)
      .send("Successfully logged in.");
  } else {
    res.status(404).send(response);
  }
});

router.get("/protected", authorization, (req, res) => {
  res.status(200).send({ entity_id: req.entity_id, role: req.role });
});

router.get("/logout", authorization, (req, res) => {
  res.clearCookie("auth_token").status(200).send("Logged out!");
});

export default router;
