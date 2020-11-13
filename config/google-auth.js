const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const mongoose = require("mongoose");
const User = require("../models/User");

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID:
          "294849066146-a91te865p6mcok8893lol4aeojt9k2ou.apps.googleusercontent.com",
        clientSecret: "-fV_gvG99vD7YJIrwX2NLyHx",
        callbackURL: "http://localhost:3000/users/auth/google/callback",
      },
      (accessToken, refreshToken, profile, done) => {
        User.findOne({ email: profile.emails[0].value })
          .then((user) => {
            if (!user) {
              var length = 30,
                charset =
                  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
                retVal = "";
              for (var i = 0, n = charset.length; i < length; ++i) {
                retVal += charset.charAt(Math.floor(Math.random() * n));
              }
              var newUser = new User({
                id: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value,
                password: retVal,
              });
              newUser.save((err, nUser) => {
                if (err) throw err;
                console.log(nUser.email + " saved to database.");
              });
            }
            return done(null, user);
          })
          .catch((err) => console.log(err));
      }
    )
  );
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};
