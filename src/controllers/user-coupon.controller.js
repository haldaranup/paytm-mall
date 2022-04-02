const UserCoupon = require("../models/user-couon.model");

const express = require("express");
const authenticate = require("../middlewares/auhthenticate");
// const { send } = require("express/lib/response");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let userCoupons = await UserCoupon.find({}).lean().exec();
    res.send(userCoupons);
  } catch (error) {
    res.send({ message: error.message });
  }
});

router.post("", async (req, res) => {
  try {
    console.log(req.user);
  } catch (error) {
    res.send({ message: error.message });
  }
});

module.exports = router;
