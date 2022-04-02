const userBuyProduct = require("../models/user.buy.product.model");
const express = require("express");
const req = require("express/lib/request");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    let product = await userBuyProduct.create(req.body);
    res.send(product);
  } catch (error) {
    res.send({ message: error.message });
  }
});
router.get("/:id", async (req, res) => {
  try {
    let products = await userBuyProduct
      .find({ userId: req.params.id })
      .lean()
      .exec();
    res.send(products);
  } catch (error) {
    res.send({ message: error.message });
  }
});
module.exports = router;
