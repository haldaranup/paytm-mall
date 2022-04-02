const express = require("express");
// const app = require("..");
const User = require("../models/user.models");
const router = express.Router();
const authenticate = require("../middlewares/auhthenticate");
router.post("/", authenticate, async (req, res) => {
  try {
    // console.log(req.user);
    res.status(201).send({ name: req.user.name, id: req.user._id });
  } catch (error) {
    res.send({ message: error.message });
  }
});

module.exports = router;
