const jwt = require("jsonwebtoken");

require('dotenv').config();

const config = process.env;

const verifyToken = (req, res, next) => {
console.log(req.cookies);
  let token = req.cookies.jwt

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = decoded;
  } 
  catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;  