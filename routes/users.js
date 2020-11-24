const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const { ensureAuthenticated } = require("../config/auth");
const User = require("../models/User");
const Organizations = require("../models/Organizations");
const Booking = require("../models/Booking");
router.get("/sign-up", (req, res) => {
  res.render("sign-up");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/sign-up", (req, res) => {
  const { name, email, password, password2 } = req.body;
  //validate data
  let errors = [];
  if (!name || !email || !password || !password2) {
    errors.push({ message: "Fill in all the data" });
  }
  if (password.length < 6) {
    errors.push({ message: "Password is too short" });
  }

  if (password !== password2) {
    errors.push({ message: "Passwords do not match" });
  }

  if (errors.length > 0) {
    res.render("sign-up", {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    User.findOne({ email: email }).then((user) => {
      if (user) {
        //User already exists
        errors.push({ message: "Email already taken" });
        res.render("sign-up", {
          errors,
          name,
          email,
          password,
          password2,
        });
      } else {
        const RegisteredUser = new User({
          name,
          email,
          password,
        });
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(RegisteredUser.password, salt, (err, hash) => {
            if (err) throw err;
            RegisteredUser.password = hash;

            RegisteredUser.save()
              .then((user) => {
                req.flash(
                  "success_message",
                  "Signed Up successfully. Login to continue"
                );
                res.redirect("/users/login");
              })
              .catch((err) => console.log(err));
          })
        );
      }
    });
  }
});

router.post("/login", function (req, res, next) {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
});

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/users/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    req.flash("success_message", "Logged in Successfully");
    res.redirect("/");
  }
);

router.get("/bookings", ensureAuthenticated, (req, res) => {
  Booking.find({ _id: { $in: req.user.bookings } }, (err, bookings) => {
    if(err)throw err;
     else{ 
       res.render('bookings',{user:req.user,bookings:bookings})
    }
})
});

router.post("/edit_profile", ensureAuthenticated, (req, res) => {
  const { name, delivery_address, phone } = req.body;
  user_id = req.user.id;
  User.findByIdAndUpdate(
    user_id,
    { name: name, delivery_address: delivery_address, phone: phone },
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        req.flash("success_message", "Information Updated Successfully");
        res.redirect("/organizations/dashboard");
      }
    }
  );
});

router.get("/logout", function (req, res, next) {
  req.logout();
  req.flash("success_message", "Logged out successfully");
  res.redirect("/users/login");
});

module.exports = router;
