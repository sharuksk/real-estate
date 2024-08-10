const mongoose = require("mongoose");
const leadSchema = new mongoose.Schema(
  {
    leadName: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      trim: true,
      required: true,
      maxlength: 10,
    },
    location: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    propertyType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PropertyType",
    },
    source: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Source",
      // required: true,
    },
    agentName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agent",
      // required: true,
    },
    createdByUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    createdByAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Lead", leadSchema);
