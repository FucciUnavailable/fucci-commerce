// backend/models/User.js
const mongoose = require('mongoose');

const userInformationSchema = new mongoose.Schema({
  fullName: { type: String },
  phone: { type: String },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  postalCode: { type: String },
  country: { type: String },
});
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userInformation: { type: userInformationSchema, default: null }, // Embedding userInformation

});

const User = mongoose.model('User', userSchema);

module.exports = User;
