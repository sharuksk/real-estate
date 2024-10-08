const jwt = require("jsonwebtoken");
exports.isAuthenticated = (req, res, next) => {
  const token = req.cookies.token;
  // console.log("Token is", token);
  if (!token) {
    return res
      .status(401)
      .json({ message: "No token provided, authorization denied." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    // console.log("Req user", req.user);
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Token is not valid." });
  }
};
