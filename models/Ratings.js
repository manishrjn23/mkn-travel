const mongoose = require("mongoose");

const RatingsSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organizations",
  },
  value_for_money: {
    type: Number,
    required: true,
  },
  staff_service: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const Ratings = mongoose.model("Ratings", RatingsSchema);
module.exports = Ratings;
