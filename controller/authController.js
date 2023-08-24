const jwt = require("jsonwebtoken");
const config = require("../config/config");
const User = require("../model/user");
const Role = require("../model/role");

const authController = {
  async signup(req, res) {
    try {
      const {
        first_name,
        last_name,
        email,
        country_code,
        phone_number,
        password,
      } = req.body;
      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          message: "User already exists",
        });
      }
      const newUser = await User.create({
        first_name,
        last_name,
        email,
        country_code,
        phone_number,
        password,
      });
      const token = jwt.sign({ id: newUser._id }, config.JWT_SECRET, {
        expiresIn: config.JWT_EXPIRES_IN,
      });
      return res.status(201).json({
        message: "User created successfully",
        token,
        user: newUser,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Something went wrong",
      });
    }
  },
};

module.exports = authController;
// Path: authify-backend/controller/productController.js
