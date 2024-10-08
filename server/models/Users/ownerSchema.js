const mongoose = require('mongoose');
const ownerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
    maxlength: 10,  
  },
  email: {
    type: String,
    required: true,
    unique: true, 
  },
  qatarId: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
 
  dob: {
    type: Date,
    required: true,
  },
  preferredLanguage: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  pinCode: {
    type: Number,
    required: true,
  },
  preferredLanguage: {
    type: String,
    required: true,
  },
 
 
  
}, { timestamps: true }); 

module.exports = mongoose.model("Owner",ownerSchema);
