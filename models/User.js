const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  aadhaar: {
    type: Buffer,
    required: true,
  },
  photo: {
    type: Buffer,
    required: true,
  },
});

module.exports = User = mongoose.model("user", userSchema);
