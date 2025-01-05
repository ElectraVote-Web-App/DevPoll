const jwt = require("jsonwebtoken");

function getUserId(req) {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded.id;
}

module.exports = getUserId;