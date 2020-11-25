const express = require("express");
const { ensureAuthenticated } = require("../config/auth");
const Booking = require("../models/Booking");
const router = express.Router();
const Organizations = require("../models/Organizations");

router.get("/", (req, res) => {
  Organizations.find().exec(function (err, orgs) {
    if (err) throw err;
    else {
      if (req.user) {
        if (req.user.bookings.length) {
          lastItem = req.user.bookings[req.user.bookings.length - 1];
          Booking.findById(lastItem, (err, lastBooking) => {
            if (err) throw err;
            else {
              Organizations.find({ city: lastBooking.organization.city })
                .sort({ overall_average_rating: -1 })
                .exec((err, recommendations) => {
                  if (err) throw err;
                  else {
                    res.render("index", {
                      user: req.user,
                      organizations: orgs,
                      recommendations,
                    });
                  }
                });
            }
          });
        } else {
          res.render("index", { user: req.user, organizations: orgs });
        }
      } else {
        res.render("index", { user: req.user, organizations: orgs });
      }
    }
  });
});

// router.get("/test", (req, res) => {
//   console.log(req.user.bookings);
// });
module.exports = router;
