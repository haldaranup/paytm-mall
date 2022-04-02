const User = require("../models/user.models");
const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
router.post(
  "",
  body("email").isEmail().withMessage("it should be an valid email").bail(),
  body("password")
    .not()
    .isEmpty()
    .withMessage("it should not be empty")
    .bail()
    .custom((value) => {
      const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[^a-zA-Z0-9])(?!.*\s).{7,15}$/;
      if (!value.match(passw)) {
        throw new Error("Password must be strong");
      }
      return true;
    }),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      return next();
    } catch (error) {
      res.send({ message: error.message });
    }
  }
);
module.exports = router;
