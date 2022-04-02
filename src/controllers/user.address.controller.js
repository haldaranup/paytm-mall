const userAddress = require("../models/user.address.model");
const express = require("express");
// const req = require("express/lib/request");
const router = express.Router();

router.post("", async (req, res) => {
  try {
    let address = await userAddress.create(req.body);
    res.send(address);
  } catch (error) {
    res.send({ message: error.message });
  }
});
router.get("/", async (req, res) => {
  try {
    let address = await userAddress.findOne({ productId: req.query.q });
    res.send(address);
  } catch (error) {
    res.send({ message: error.message });
  }
});
module.exports = router;
