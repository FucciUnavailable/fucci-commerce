// backend/models/User.js
const mongoose = require('mongoose');

const userInformationSchema = new mongoose.Schema({
  fullName: { type: String, default: '' },
  phone: { type: String, default: '' },
  address: { type: String, default: '' },
  city: { type: String, default: '' },
  state: { type: String, default: '' },
  postalCode: { type: String, default: '' },
  country: { type: String, default: '' },
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
  userInformation: { type: userInformationSchema, default: null }, // Embedding userInformation

});

const User = mongoose.model('User', userSchema);

module.exports = User;
