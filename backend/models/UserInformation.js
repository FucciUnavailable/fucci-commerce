// models/UserInformation.js
const mongoose = require('mongoose');
const User = require('./User'); // Import the User model

const userInformationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
  fullName: { type: String },
  phone: { type: String },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  postalCode: { type: String },
  country: { type: String },
});

const UserInformation = mongoose.model('UserInformation', userInformationSchema);

module.exports = UserInformation;
