const express = require("express");
const app = express();
const cors = require("cors");
const {
  register,
  login,
  generateToken,
} = require("./controllers/auth-controller");
const userController = require("./controllers/user.controller");
//used for register a customer
const registerController = require("./controllers/register.controller");
// user for logina customer
const loginController = require("./controllers/login.controller");
// it is required for google oauth
const passport = require("./config/google.oauth");
// used for sending the all data of coupon to home page
const couponController = require("./controllers/coupon.controller");
// used for appening the brand coupon in home page
const couponHomeController = require("./controllers/coupon.home.controller");
// users all coupon controller
const userBuyCouponController = require("./controllers/user.buy.coupon.controller");
// fashion controller
const fashionController = require("./controllers/fashion.controller");
// user product controllere
const userCartProductController = require("./controllers/user.product.cart.controllers");
// users bought products
const userBuyProductController = require("./controllers/user.buy.product.controller");
// user address controller
const userAddressController = require("./controllers/user.address.controller");

app.use(express.json());
app.use(cors());
app.use("/user", userController);
app.use("/register", registerController, register);
app.use("/login", loginController, login);
app.use("/coupon", couponController);
app.use("/couponHome", couponHomeController);
app.use("/userBuyCoupon", userBuyCouponController);
app.use("/fashion", fashionController);
app.use("/userCartProduct", userCartProductController);
app.use("/userBuyProduct", userBuyProductController);
app.use("/userAddress", userAddressController);
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),

  function (req, res) {
    const token = generateToken(req.user);
    return res
      .status(200)
      .send({ name: req.user.name, email: req.user.email, token });
  }
);

module.exports = app;
