const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true },
    number: { type: String },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
userSchema.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.password, 8);
  console.log(hash);
  this.password = hash;
  return next();
});

module.exports = mongoose.model("user", userSchema);
