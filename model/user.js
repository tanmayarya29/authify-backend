const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  last_name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  country_code: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  phone_number: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  role: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    default: "user",
  },
  password: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  cart: {
    type: Array,
    default: [],
  },
  wishlist: {
    type: Array,
    default: [],
  },
  orders: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("User", userSchema);
