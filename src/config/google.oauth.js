const GoogleStrategy = require("passport-google-oauth2").Strategy;
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const passport = require("passport");
const User = require("../models/user.models");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5901/auth/google/callback",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      let user = await User.findOne({ email: profile._json.email });
      if (!user) {
        user = await User.create({
          name: profile._json.given_name,
          email: profile._json.email,
          password: uuidv4(),
        });
      }
      return done(null, user);
    }
  )
);
module.exports = passport;
