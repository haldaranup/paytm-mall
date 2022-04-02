const express = require("express");
const Coupon = require("../models/coupon.home.model");

const router = express.Router();

router.post("", async (req, res) => {
  try {
    const coupon = await Coupon.create(req.body);
    res.send(coupon);
  } catch (error) {
    res.send({ message: error.message });
  }
});
router.get("", async (req, res) => {
  try {
    const coupons = await Coupon.find({}).lean().exec();
    res.send(coupons);
  } catch (error) {
    res.send({ message: error.message });
  }
});

module.exports = router;
