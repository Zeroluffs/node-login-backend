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
        expenses: user.expenses,
        budget: user.budget,
      },
      "8Zz5tw0Ionm3XPZZfN0NOml3z9FMfmpgXwovR9fp6ryDIoGRM8EPHAB6iHsc0fb",
      { expiresIn: "1h" }
    );
  }

  const userCtrl = {};


  userCtrl.getAllUsers = async (req, res) => {
    console.log("getAllUsers");
    const users = await User.find();
    res.json(users);
  };

  module.exports = userCtrl;