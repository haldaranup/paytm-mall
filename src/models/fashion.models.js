const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
  {
    image: { type: String, required: true }, // fashion image
    brand: { type: String, required: true }, // brand like jockey
    name: { type: String, required: true }, // name like Regular short fit of 3
    price: { type: Number, required: true }, // price like 990
    stPrice: { type: Number, required: true }, // like 1299
    discount: { type: Number, required: true }, // like 56 or 75 but less than 100
    size: { type: String, default: "M" },
    category: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
module.exports = mongoose.model("fashion", couponSchema);
