const jwt = require("jsonwebtoken");

// Middleware to check if user is authenticated or not
const userAuth = (req, res, next) => {
  const token = req.header("auth-token");
  const JWT_SECRET = "THISISTHEJSONWEBTOKENFORTHISBLOGAPPLICATION";
  if (!token) {
    res
      .status(200)
      .send({ msg: "Please Authenticate with Valid Token", authError: true });
  } else {
    try {
      const data = jwt.verify(token, JWT_SECRET);
      // Appending the user to Req body
      req.user = data.user;
      next();
    } catch (error) {
      res
        .status(200)
        .send({ msg: "Please Authenticate with Valid Token", authError: true });
    }
  }
};

module.exports = userAuth;
