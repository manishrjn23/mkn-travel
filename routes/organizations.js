const express = require("express");
const { ensureAuthenticated } = require("../config/auth");
const router = express.Router();
const Organizations = require("../models/Organizations");
const Ratings = require("../models/Ratings");
const mongoose = require("mongoose");
const { render } = require("ejs");
const e = require("express");
const Booking = require("../models/Booking");
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
  wifi=0
  if (req.query.sort === "overall_average_rating") {
    sortCondition["overall_average_rating"] = -1;
  }
  if (req.query.sort === "value_for_money") {
    sortCondition["overall_value_rating"] = -1;
  }
  if (req.query.sort === "staff_service") {
    sortCondition["overall_staff_rating"] = -1;
  }
  if (req.query.sort === "descending_price") {
    sortCondition["price"] = -1;
  }
  if (req.query.sort === "ascending_price") {
    sortCondition["price"] = 1;
  }
  if(req.query.wifi==='wifiyes'){
    wifi=1
  }
  a=(2===4?2:4);
  if (req.query.search && req.query.city) {
    const regex1 = new RegExp(searchRegularExpression(req.query.search), "gi");
    const regex2 = new RegExp(searchRegularExpression(req.query.city), "gi");
    quer={ name: regex1, city: regex2, field: req.query.filter }
    if(wifi){
      quer['wifi']=1
    }
    Organizations.find(quer)
      .sort(sortCondition)
      .exec(function (err, orgs) {
        if (err) throw err;
        else {
          res.render("search", { user: req.user, organizations: orgs });
        }
      });
  } else if (!req.query.search && req.query.city) {
    const regex2 = new RegExp(searchRegularExpression(req.query.city), "gi");
    quer={ field: req.query.filter, city: regex2 }
    if(wifi){
      quer['wifi']=1
    }
    Organizations.find(quer)
      .sort(sortCondition)
      .exec(function (err, orgs) {
        if (err) throw err;
        else {
          res.render("search", { organizations: orgs, user: req.user });
        }
      });
  } else if (req.query.search && !req.query.city) {
    const regex1 = new RegExp(searchRegularExpression(req.query.search), "gi");
    quer={ field: req.query.filter, name: regex1 }
    if(wifi){
      quer['wifi']=1
    }
    Organizations.find(quer)
      .sort(sortCondition)
      .exec(function (err, orgs) {
        if (err) throw err;
        else {
          res.render("search", { organizations: orgs, user: req.user });
        }
      });
  } else if (!req.query.city && !req.query.city) {
    quer={ field: req.query.filter }
    if(wifi){
      quer['wifi']=1
    }
    Organizations.find({ field: req.query.filter })
      .sort(sortCondition)
      .exec(function (err, orgs) {
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

router.post("/info/:id/book", ensureAuthenticated, (req, res) => {
  Organizations.findById(req.params.id, (err, org) => {
    if (err) throw err;
    else {
      if (req.body.date2) {
        d1 = new Date(req.body.date1);
        d2 = new Date(req.body.date2);
        nights = (d2.getTime() - d1.getTime()) / (1000 * 3600 * 24);
        if (nights <= 0) {
          req.flash("error_message","Check out date cannot be before check in date")
          res.redirect("/organizations/info/" + req.params.id);
          return;
        }
        cost = org.price * nights * req.body.people;
        newBooking = new Booking({
          user: req.user,
          organization: org,
          date1: req.body.date1,
          date2: req.body.date2,
          people: req.body.people,
          cost: cost,
        });
      } else {
        cost = org.price * req.body.people;
        newBooking = new Booking({
          user: req.user,
          organization: org,
          date1: req.body.date1,
          people: req.body.people,
          cost: cost,
        });
      }
      newBooking
        .save()
        .then((booking) => {
          req.user.bookings.push(mongoose.Types.ObjectId(booking.id));
          req.user.save();
          req.flash('success_message','Booking successful. ₹'+booking.cost+' credited from your account.' );
          res.redirect("/users/bookings");
        })
        .catch((err) => console.log(err));
    }
  });
});

router.post("/info/:id", ensureAuthenticated, (req, res) => {
  const user = req.user.name;
  const organization = mongoose.Types.ObjectId(req.params.id);
  const value_for_money = req.body.value_for_money.length;
  const staff_service = req.body.staff_service.length;
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
          sum = 0;
          sum_val = 0;
          sum_staff = 0;
          org.ratings.forEach((rating) => {
            sum += (rating.staff_service + rating.value_for_money) / 2;
            sum_val = rating.value_for_money;
            sum_staff = rating.staff_service;
          });
          org.overall_average_rating = (sum / org.ratings.length).toFixed(2);
          org.overall_staff_rating = (sum_staff / org.ratings.length).toFixed(2);
          org.overall_value_rating = (sum_val / org.ratings.length).toFixed(2);
          
          org.save();
          req.flash("success_message", "Rated successfully");
          res.redirect("/organizations/info/" + req.params.id);
        }
      });
    })
    .catch((err) => console.log(err));
});

// router.get("/test", (req, res) => {
//   Organizations.updateMany({}, { wifi: 1 }, function (err, numberAffected) {
//     console.log('job done')
//   });
// });

module.exports = router;
