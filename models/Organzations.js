const mongoose = require("mongoose");

const OrganizationsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  field:{
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  images:[{
    type: String,
  }],
  maps:{
    type: String,
    required: true
  }
});

const Organizations = mongoose.model("Organizations", OrganizationsSchema);
module.exports = Organizations;
