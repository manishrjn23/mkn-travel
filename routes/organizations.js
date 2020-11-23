const express = require("express");
const { ensureAuthenticated } = require("../config/auth");
const router = express.Router();

const Ratings = require("../models/Ratings");
const mongoose = require("mongoose");
const { render } = require("ejs");
const e = require("express");

//item specific page

router.get("/info/:id", ensureAuthenticated, (req, res) => {
  id = mongoose.Types.ObjectId(req.params.id);
  Organizations.findById(id, function (err, org) {
    if (err) throw err;
    else {
      res.render("org-page", { org });
    }
  });
});

//display all items
router.get("/explore", ensureAuthenticated, (req, res) => {
  var sortCondition = {};
  if (req.query.search) {
    const regex = new RegExp(searchRegularExpression(req.query.search), "gi");
    Organizations.find({ $or: [{ name: regex }, { description: regex }] })
      .sort(sortCondition)
      .exec(function (err, orgs) {
        if (err) throw err;
        else {
          res.render("explore", { user: req.user, orgs: orgs });
        }
      });
  } else {
    Organizations.find().exec(function (err, orgs) {
      if (err) throw err;
      else {
        res.render("explore", { orgs });
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
