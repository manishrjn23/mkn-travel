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
  bookings: [
    {
      org: { type: mongoose.Schema.Types.ObjectId, ref: "Organizations" },
      check_in: { type: Date, required: true },
      check_out: { type: Date, required: true },
    },
  ],
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
