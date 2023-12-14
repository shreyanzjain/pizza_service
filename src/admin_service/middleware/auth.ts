import jwt from "jsonwebtoken";

const authorization = (req, res, next) => {
  const token = req.cookies.auth_token;
  if (token) {
    try {
      const { id, role } = jwt.verify(token, process.env.ENTITY_SECRET);
      req.entity_id = id;
      req.role = role;
      if (role !== "ADMIN") {
        throw new Error("Unauthorized.");
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
