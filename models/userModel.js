const mongoose = require('mongoose');
const validator = require('validator');

// name, email, photo, password, passwordConfirm
const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Please tell us your name'],
  },
  email: {
    type: String,
    require: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minLength: 8,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;