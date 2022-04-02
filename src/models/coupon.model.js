const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    offPrice: { type: Number, required: true },
    ph1: { type: String, required: true },
    ph2: { type: String, required: true },
    ph3: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
module.exports = mongoose.model("coupon", couponSchema);
