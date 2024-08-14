const jwt = require("jsonwebtoken");

const jwebtoken = process.env.JWT_SECRET;

function generateAccessToken(user) {
  return jwt.sign(user, jwebtoken, { expiresIn: "1h" });
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401); 
  }

  jwt.verify(token, jwebtoken, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}

module.exports = {
  generateAccessToken,
  authenticateToken,
};
