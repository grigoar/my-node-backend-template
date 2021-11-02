const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your email'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide your email!'],
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
    unique: true,
  },
  photo: {
    type: String,
    required: false,
    default: 'default.jpg',
  },
  role: {
    type: String,
    enum: ['user', 'power-user', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator(el) {
        return el === this.password;
      },
      message: "Password don't match",
    },
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
