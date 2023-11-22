import jwt from "jsonwebtoken";

const authorization = (req, res, next) => {
  const token = req.cookies.auth_token;
  if (token) {
    try {
      const { id } = jwt.verify(token, process.env.RESTAURANT_SECRET_KEY);
      req.restaurant_id = id;
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
