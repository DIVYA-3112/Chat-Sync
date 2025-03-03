// express setup
const express = require("express");

// mongoose setup
const mongoose = require("mongoose");

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Failed to connect MongoDB", error);
  }
}

module.exports = connect;