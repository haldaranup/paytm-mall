const mongoose = require("mongoose");
const userCartProductSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  productId: { type: String, required: true },
});

module.exports = mongoose.model("userCartProduct", userCartProductSchema);
