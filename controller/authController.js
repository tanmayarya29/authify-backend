const jwt = require("jsonwebtoken");
const User = require("../model/user");
const bcrypt = require("bcrypt");
const { client } = require("../config/redis");
const { generateAccessToken } = require("../middleware/auth");
const config = require("../config/config");

exports.signup = async (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user)
        return res.status(400).json({ error: "User already registered" });
      const newUser = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        country_code: req.body.country_code,
        phone_number: req.body.phone_number,
        role: req.body.role,
        password: req.body.password,
        cart: [],
        wishlist: [],
        orders: [],
      });
      newUser
        .save()
        .then((user) => {
          res.status(200).json({ message: "User registered successfully" });
        })
        .catch((err) => {
          res.status(400).json({ error: "Unable to register user" });
        });
    })
    .catch((err) => {
      res.status(400).json({ error: "Unable to register user" });
    });
};

exports.login = async (req, res) => {
  const { email, password } = req.body.user;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) return res.status(400).json({ error: "User does not exist" });
      bcrypt
        .compare(password, user.password)
        .then((isValid) => {
          const accessToken = generateAccessToken({
            name: user.first_name + " " + user.last_name,
            role: user.role,
          });
          const refreshToken = jwt.sign(
            { name: user.first_name + " " + user.last_name, role: user.role },
            config.JWT_SECRET_REFRESH
          );
          client
            .set(refreshToken, user.email)
            .then(() => {
              res.status(200).json({
                accessToken: accessToken,
                refreshToken: refreshToken,
              });
            })
            .catch((err) => {
              console.log(err);
              return res.status(500).json({ error: "Internal Server Error" });
            });
        })
        .catch((err) => {
          console.log(err);
          return res.status(400).json({ error: "Invalid credentials" });
        });
    })
    .catch((err) => {
      res.status(400).json({ error: "Unable to login" });
    });
};

exports.logout = async (req, res) => {
  const refreshToken = req.body.token;
  client
    .del(refreshToken)
    .then(() => {
      res.status(204).json({ message: "Logged out successfully" });
    })
    .catch((err) => {
      return res.status(500).json({ error: "Internal Server Error" });
    });
};

exports.googleCallback = async (req, res) => {
  const token = jwt.sign({ _id: req.user._id }, config.JWT_SECRET);
  res.status(200).json({ token });
};
