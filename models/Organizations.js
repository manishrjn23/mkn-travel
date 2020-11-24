const mongoose = require("mongoose");

const OrganizationsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  field: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
    },
  ],
  maps: {
    type: String,
  },
  ratings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ratings",
    },
  ],
});

const Organizations = mongoose.model("Organizations", OrganizationsSchema);
module.exports = Organizations;
