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
  date1:{
      type:Date,
      required:true
  },
  date2:{
      type:Date
  },
  cost:{
      type:Number,
      required:true
  },
  people:{
      type:Number,
      required:true
  }
});

const Ratings = mongoose.model("Ratings", RatingsSchema);
module.exports = Ratings;
