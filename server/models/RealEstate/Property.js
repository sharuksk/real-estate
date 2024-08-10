const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  propertyName: {
    type: String,
    required: true,
    trim: true,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  propertyType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PropertyType",
    required: true,
  },
  referenceAgent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  price: {
    type: Number,
    required: true,
  },
  amenities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Amenity",
    },
  ],
  loan: {
    type: Boolean,
    default: false,
  },
  city: {
    type: String,
    required: true,
  },
  projectArea: {
    type: String,
    required: true,
  },
  propertyAge: {
    type: Number,
    required: true,
  },
  coverImage: {
    type: String,
    required: true,
  },
  createdByUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdByAdmin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
  },
});

module.exports = mongoose.model("Property", propertySchema);
