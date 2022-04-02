const User = require("../models/user.models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

// generate token for user
const generateToken = (user) => {
  return jwt.sign({ user }, process.env.sercet_key);
};
const verifyPassword = (hash, myPlaintextPassword) => {
  return bcrypt.compareSync(myPlaintextPassword, hash);
};

// register for user
const register = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email }).lean().exec();
    if (user) {
      res.send({ message: "already exist" });
    } else {
      user = await User.create(req.body);
      // console.log(user);
      const token = generateToken(user);
      // console.log("token", token);
      res.status(201).json({
        token: token,
        email: user.email,
        name: user.name,
      });
    }
  } catch (error) {
    res.send({ error: error.message });
  }
};

// login user
const login = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email }).lean().exec();
    if (!user) {
      res.status(401).send({ message: "email and possword is wrong" });
    } else {
      const match = verifyPassword(user.password, req.body.password);
      if (!match) {
        res.send({ message: "email and possword is wrong" });
      } else {
        const token = generateToken(user);
        res.status(201).json({
          token: token,
          name: user.name,
        });
      }
    }
  } catch (error) {
    res.send({ message: error.message });
  }
};

module.exports = { register, login, generateToken };
