import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "No token provided!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // decoded should contain user id, role, etc.
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
