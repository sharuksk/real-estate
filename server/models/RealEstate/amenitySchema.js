const mongoose = require('mongoose');

const amenitySchema = new mongoose.Schema({
  amenityname: {
    type: String,
    required: true,
    trim: true
  },
  createdBy: {
    type: String, 
    required: true
  }
});

module.exports = mongoose.model("Amenity", amenitySchema);
