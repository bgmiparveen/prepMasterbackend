const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,   // ✅ MUST be String
    required: true,
  },
  profile: {
    type: String,   // for image path
  },
});

module.exports = mongoose.model("User", userSchema);