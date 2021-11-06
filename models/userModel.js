const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your email'],
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please provide your email!'],
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
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

//Encryption of the password
userSchema.pre('save', async function (next) {
  //Only run this if the password was modified
  if (!this.isModified('password')) return next();

  // Hash the password with the cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  //to not store in the DB
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = (providedPass, dbPass) =>
  bcrypt.compare(providedPass, dbPass);

const User = mongoose.model('User', userSchema);

module.exports = User;
