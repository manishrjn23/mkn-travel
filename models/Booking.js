const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organizations",
  },
  date1: {
    type: Date,
    required: true,
  },
  date2: {
    type: Date,
  },
  cost: {
    type: Number,
  },
  people: {
    type: Number,
    required: true,
  },
});

const Booking = mongoose.model("Booking", BookingSchema);
module.exports = Booking;
