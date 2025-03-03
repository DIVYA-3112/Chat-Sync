// mongoose setup
const mongoose = require("mongoose");

// user schema
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
    type: String,
    required: true,
    minlength: 6,
  },
  profilePic: {
    type: String,
    default: "",
  },
}, {timestamps: true});

// user model
const User = mongoose.model("user", userSchema);

module.exports = User;