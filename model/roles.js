const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    default: "user",
  },
  permissions: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("Role", roleSchema);
