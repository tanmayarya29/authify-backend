const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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

// Hashing password before saving
userSchema.pre("save", async function (next) {
  const user = this;
  const hash = await bcrypt.hash(user.password, 10);
  this.password = hash;
  next();
});

module.exports = mongoose.model("User", userSchema);
