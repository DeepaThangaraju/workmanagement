
import { unAuthunticatedError } from "../errors/index.js";
import jwt from "jsonwebtoken"
const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new unAuthunticatedError("Authentication invalid");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_KEY);
    req.user = payload;
    next();
  } catch (error) {
    throw new unAuthunticatedError("Authentication invalid");
  }
};

export default authenticate;
