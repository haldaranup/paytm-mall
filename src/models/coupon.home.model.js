const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    name: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
module.exports = mongoose.model("couponHome", couponSchema);
