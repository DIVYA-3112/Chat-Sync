// installing express and models
const express = require("express");
const app = express();
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const token = require("../config/utils");
const generateToken = require("../config/utils");
const cloudinary = require("../config/cloudinary");

app.use(express.json());

// Set random fallback for bcrypt
bcrypt.setRandomFallback((len) => {
  const buf = new Uint8Array(len);
  return buf.map(() => Math.floor(Math.random() * 256));
});

// auth routes controllers

const signup = async (req, res) => {
  const { fullname, email, password } = req.body;
  console.log(req.body); // Log the request body

  try {
    if (!password || !email || !fullname) {
      return res.status(400).json({ error: "Please fill all the fields" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      return res.status(201).json({
        message: "User created",
        fullname: newUser.fullname,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      return res.status(400).json({ error: "User not created" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "error in signup controller" });
  }
};

const login = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ error: "Please fill all the fields" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ error: "Invalid credentials - User not found" });
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ error: "Invalid credentials - Password not found" });
      } else {
        generateToken(user._id, res);
        return res.status(200).json({
          message: "User logged in",
          fullname: user.fullname,
          email: user.email,
          profilePic: user.profilePic,
        });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "error in login controller" });
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "User logged out" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "error in logout controller" });
  }
};

const updateProfile = async (req, res) => {
  const { profilePic } = req.body;
  console.log(profilePic);
  try {
    const userId = req.user._id;
    if (!profilePic) {
      return res.status(400).json({ error: "Please fill all the fields" });
    }
    const uploadResponse = await cloudinary.uploader.upload(profilePic, {
      upload_preset: "chat-sync",
    });
    const user = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "error in updateProfile controller" });
  }
};

const checkAuth = (req, res) => {
  try {
    const user = req.user;
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "error in checkAuth controller" });
  }
};

// exporting auth routes controllers
module.exports = {
  signup,
  login,
  logout,
  updateProfile,
  checkAuth
};
