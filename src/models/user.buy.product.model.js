const mongoose = require("mongoose");
const userBuyProductSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    productId: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("userBuyProduct", userBuyProductSchema);
