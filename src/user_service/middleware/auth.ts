// User authorization middleware

import jwt = require('jsonwebtoken');

const authorization = (req, res, next) => {
  const token = req.cookies.auth_token;
  if (token) {
    try {
    const {id, city} = jwt.verify(token, process.env.USER_SECRET_KEY);
        req.customer_id = id;
        req.city = city;
        next();
    }   catch   {
        return res.status(403).send("Invalid auth_token. Forbidden. Please Log in!");
    }
  } else {
    return res.status(403).send("No auth_token. Forbidden. Please Log in!");
  }
};

export default authorization;