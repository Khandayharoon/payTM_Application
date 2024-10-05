const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config");

const middleware = (req, res, next) => {
  console.log("JWT_SECRET", JWT_SECRET);
  const cookiesToken = req.cookies.token;
  console.log("cookiesToken ", cookiesToken);
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json("Authentication Invaild in if");
  }
  const token = authHeader.split(" ")[1];
  console.log("token in m", token);
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("decoded", decoded);
    if (decoded.userId) {
      req.userId = decoded.userId;
      console.log(decoded.userId);
      next();
    } else {
      return res.status(403).json("Authentication Invaild in try");
    }
  } catch (e) {
    return res.status(403).json("Authentication Invaild in catch");
  }
};

module.exports = middleware;
