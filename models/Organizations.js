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
  price: {
    type: Number,
  },
  description: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  wifi: {
    type: Number,
    default: false,
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
  ratings: [
    {
      type: Object,
    },
  ],
  overall_average_rating: {
    type: Number,
    default: 0,
  },
  overall_staff_rating: {
    type: Number,
    default: 0,
  },
  overall_value_rating: {
    type: Number,
    default: 0,
  },
});

const Organizations = mongoose.model("Organizations", OrganizationsSchema);
module.exports = Organizations;
