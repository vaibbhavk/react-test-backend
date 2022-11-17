const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("X-AUTH-TOKEN");

  if (!token) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Invalid token" });
  }
};
