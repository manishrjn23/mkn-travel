const express = require("express");
const { ensureAuthenticated } = require("../config/auth");
const router = express.Router();
const Organizations = require("../models/Organizations");
const Ratings = require("../models/Ratings");
const mongoose = require("mongoose");
const { render } = require("ejs");
const e = require("express");
const Booking=require('../models/Booking')
//item specific page

router.get("/info/:id", (req, res) => {
  id = mongoose.Types.ObjectId(req.params.id);
  Organizations.findById(id, function (err, org) {
    if (err) throw err;
    else {
      res.render("organization", { user: req.user, organization: org });
    }
  });
});

//display all items
router.get("/search", (req, res) => {
  var sortCondition = {};
  if (req.query.sort === "descending_rating") {
    sortCondition = { overall_rating: -1 };
  }
  if (req.query.sort === "ascending_rating") {
    sortCondition = { overall_rating: 1 };
  }
  if (req.query.search && req.query.city) {
    const regex1 = new RegExp(searchRegularExpression(req.query.search), "gi");
    const regex2 = new RegExp(searchRegularExpression(req.query.city), "gi");
    Organizations.find({ name: regex1, city: regex2, field: req.query.filter })
      .sort(sortCondition)
      .exec(function (err, orgs) {
        if (err) throw err;
        else {
          res.render("search", { user: req.user, organizations: orgs });
        }
      });
  } else if (!req.query.search && req.query.city) {
    const regex2 = new RegExp(searchRegularExpression(req.query.city), "gi");
    Organizations.find({ field: req.query.filter, city: regex2 }).exec(
      function (err, orgs) {
        if (err) throw err;
        else {
          res.render("search", { organizations: orgs, user: req.user });
        }
      }
    );
  } else if (req.query.search && !req.query.city) {
    const regex1 = new RegExp(searchRegularExpression(req.query.search), "gi");
    Organizations.find({ field: req.query.filter, name: regex1 }).exec(
      function (err, orgs) {
        if (err) throw err;
        else {
          res.render("search", { organizations: orgs, user: req.user });
        }
      }
    );
  } else if (!req.query.city && !req.query.city) {
    Organizations.find({ field: req.query.filter }).exec(function (err, orgs) {
      if (err) throw err;
      else {
        res.render("search", { organizations: orgs, user: req.user });
      }
    });
  }
});

//add items

router.get("/additem", (req, res) => {
  name = "Dwarka Palace";
  field = "hotel";
  city = "Delhi";
  address = `C991, Behind Maxfort School, Sector 7, Dwarka
Phone:099710 54499

`;
  description = `luxurious rooms with a great spread of breakfast`;

  const newOrg = new Organizations({ name, description, field, city, address });
  newOrg.save();
  res.send(name + " successfully added");
});

function searchRegularExpression(searchQuery) {
  return searchQuery.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

router.post('/info/:id/book',ensureAuthenticated,(req,res)=>{
  const newBooking = new Booking({user:req.user,organization:req.params.id,date1:req.body.date1,if(date2) {date2:req.body.date2},people:req.body.people});
  console.log(newBooking);
})

router.post("/info/:id", ensureAuthenticated, (req, res) => {
  const user = req.user;
  const organization = mongoose.Types.ObjectId(req.params.id);
  const value_for_money = req.body.value_for_money;
  const staff_service = req.body.staff_service;
  const review = req.body.review;
  const newRating = new Ratings({
    user,
    organization,
    value_for_money,
    staff_service,
    review,
  });
  newRating
    .save()
    .then((rating) => {
      Organizations.findById(organization, function (err, org) {
        if (err) {
          throw err;
        } else {
          org.ratings.push(rating);
          org.save();
          req.flash("success_message", "Rated successfully");
          res.redirect("/organizations/" + req.params.id);
        }
      });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
