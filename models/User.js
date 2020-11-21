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
  bookmarks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organizations",
    },
  ],
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
