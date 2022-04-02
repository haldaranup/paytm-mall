const userCartProduct = require("../models/user.cart.product.model");
const express = require("express");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    let product = await userCartProduct.create(req.body);
    res.send(product);
  } catch (error) {
    res.send({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    console.log("id", req.params.id);
    let products = await userCartProduct.find({ userId: req.params.id });
    // console.log(products);
    res.send(products);
  } catch (error) {
    res.send({ message: error.message });
  }
});
router.delete("/", async (req, res) => {
  try {
    console.log(req.query.p, req.query.u, "id");
    let products = await userCartProduct.findOneAndDelete({
      $and: [{ productId: req.query.p }, { userId: req.query.u }],
    });
    res.send(products);
    console.log("pro", products);
  } catch (error) {
    res.send({ message: error.message });
  }
});
module.exports = router;
