const jwt = require("jsonwebtoken");
const { client } = require("../config/redis");
const config = require("../config/config");

const generateTokenByRefresh = async (req, res) => {
  const email = req.body.email; // email is used as key for redis and refresh token is value
  if (email == null) return res.status(401).json({ error: "Unauthorized" });
  client
    .get(email)
    .then((reply) => {
      // reply is refresh token
      if (!reply) {
        return res.status(403).json({ error: "Forbidden access" });
      }
      jwt.verify(reply, config.JWT_SECRET_REFRESH, (err, user) => {
        if (err) {
          return res.status(403).json({ error: "Forbidden access" });
        }

        const accessToken = generateAccessToken({
          name: user.first_name + " " + user.last_name,
          role: user.role,
        });
        res.json({ accessToken: accessToken });
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ error: "Internal Server Error" });
    });
};

const generateAccessToken = (user) => {
  return jwt.sign(user, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRES_IN,
  });
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, config.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

module.exports = {
  generateAccessToken,
  generateTokenByRefresh,
  authenticateToken,
};
