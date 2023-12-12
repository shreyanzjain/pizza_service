// User authorization middleware

import jwt = require("jsonwebtoken");

const authorization = (req, res, next) => {
  const token = req.cookies.auth_token;
  if (token) {
    try {
      const { entity_id, role } = jwt.verify(token, process.env.ENTITY_SECRET);
      req.entity_id = entity_id;
      req.role = role;
      if (role !== "CUSTOMER") {
        throw new Error("Invalid auth_token. Forbidden. Please Log in!");
      }
      next();
    } catch {
      return res
        .status(403)
        .send("Invalid auth_token. Forbidden. Please Log in!");
    }
  } else {
    return res.status(403).send("No auth_token. Forbidden. Please Log in!");
  }
};

export default authorization;
