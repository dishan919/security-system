import jwt from "jsonwebtoken";



 export const verifyToken = (req, res, next) => {
  req.user = { id: "test-user" }; // fake login
  next();
};