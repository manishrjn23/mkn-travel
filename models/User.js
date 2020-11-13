const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    default: "",
  },
  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotels",
    },
  ],
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotels",
    },
  ],
  hotel_bookings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotels",
    },{
      type:Date,
      
    }
  ],
  flight_bookings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flights",
    },
  ],
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
