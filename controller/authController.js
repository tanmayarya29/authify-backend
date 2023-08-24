const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../model/user");

exports.signup = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) throw err;
    if (!user) res.status(400).json({ error: "Invalid credentials" });
    else {
      req.logIn(user, { session: false }, (err) => {
        if (err) throw err;
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        res.status(200).json({ token });
      });
    }
  })(req, res, next);
};

exports.googleCallback = async (req, res) => {
  const token = jwt.sign({ _id: req.user._id }, process.env.JWT_SECRET);
  res.status(200).json({ token });
};

exports.logout = async (req, res) => {
  req.logout();
  res.status(200).json({ message: "Logged out successfully" });
};
