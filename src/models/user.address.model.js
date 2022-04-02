const mongoose = require("mongoose");

const userAddressSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    address1: { type: String, required: true },
    country: { type: String, required: true },
    zipcode: { type: String, required: true },
    mobile_no: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("userAddress", userAddressSchema);
