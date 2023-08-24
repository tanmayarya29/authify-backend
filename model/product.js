const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  price: {
    type: Number,
    required: true,
    trim: true,
    lowercase: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  image: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  quantity: {
    type: Number,
    required: true,
    trim: true,
    lowercase: true,
  },
  rating: {
    type: Number,
    required: true,
    trim: true,
    lowercase: true,
  },
  reviews: {
    type: Array,
    default: [],
  },
  date_added: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
