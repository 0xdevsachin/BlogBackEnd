const jwt = require("jsonwebtoken");

// Middleware to check if user is authenticated or not
const userAuth = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send("Please Authenticate with Valid Token");
  } else {
    try {
      const data = jwt.verify(token, process.env.JWT_SECRET);
      // Appending the user to Req body
      req.user = data.user;
      next();
    } catch (error) {
      res.status(401).send("Please Authenticate with Valid Token");
    }
  }
};

module.exports = userAuth;
