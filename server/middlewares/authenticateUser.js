const jwt = require("jsonwebtoken");

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.token;
    const user = jwt.verify(token, process.env.JWT_KEY);
    req.user = user._id;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({
      status: "failed",
      message: "user unauthorized",
    });
  }
};

module.exports = authenticateUser
