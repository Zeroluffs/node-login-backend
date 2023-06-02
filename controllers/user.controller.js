const User = require("../models/User");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const { SECRET_KEY } = require("../../.config");

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
    },
    "8Zz5tw0Ionm3XPZZfN0NOml3z9FMfmpgXwovR9fp6ryDIoGRM8EPHAB6iHsc0fb",
    { expiresIn: "1h" }
  );
}

const userCtrl = {};

userCtrl.getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

userCtrl.registerUser = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    createdAt: new Date().toISOString(),
  });
  try {
    resUser = await newUser.save();
    const token = generateToken(resUser);
    res.json({
      token: token,
    });
  } catch (error) {
    res
      .status(400)
      .send("Error registering new user please try again.");
  }
};

userCtrl.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error("User not found");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new Error("Incorrect username or password");
    }
    const token = generateToken(user);
    res.json({
      token: token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = userCtrl;
