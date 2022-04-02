const mongoose = require("mongoose");

const userBuyCouponSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    couponId: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("userBuyCoupon", userBuyCouponSchema);
