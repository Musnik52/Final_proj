const jwt = require("jsonwebtoken");
const User = require("../models/User");
const config = require("config");
const sessionData = config.get("sessionData")

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt_TOKEN;
  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, sessionData.secret, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.status(403).json({error: err.message});
      } else {
        // we may here- check the user role ...
        next();
      }
    });
  } else {
    res.status(404);
  }
};

module.exports = { requireAuth };
