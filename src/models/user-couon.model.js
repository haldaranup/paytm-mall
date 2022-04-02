const mongoose = require("mongoose");

const userCoupanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
    couponId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "coupon",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
module.exports = mongoose.model("userCoupon", userCoupanSchema);
