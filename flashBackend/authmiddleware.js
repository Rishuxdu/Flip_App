const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.json({ message: "No token" });
  }

  const token = authorization.split(" ")[1];
  if (!token) {
    return res.json({ message: "Token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userPayload = decoded; 
    next();
  } catch (err) {
    res.json({ message: "Invalid token" });
  }
}

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email }, 
    process.env.JWT_KEY
  );
};

module.exports = { authMiddleware, generateToken };


