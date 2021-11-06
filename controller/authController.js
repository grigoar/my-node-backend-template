/* eslint-disable no-param-reassign */
/* eslint-disable arrow-body-style */
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

//Create the JWT token
const signToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: { user },
  });
};

exports.signup = catchAsync(async (req, res) => {
  // console.log(req.params.id);
  //   const newUser = await User.create(req.body);
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email.toLowerCase(),
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    //the role or any other resources should be changed securely after
    // role: req.body.role
  });

  createSendToken(newUser, 201, res);
  //   const token = signToken(newUser._id);
  //   newUser.password = undefined;
  //   res.status(200).json({
  //     status: 'success',
  //     token,
  //     data: newUser,
  //   });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }

  const user = await User.findOne({ email }).select('+password');

  //   const correct = await user.correctPassword(password, user.password);
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password!', 401));
  }
  //3)If everything is correct send the token to client
  createSendToken(user, 200, res);
  //   const token = signToken(user._id);
  //   res.status(200).json({
  //     status: 'success',
  //     token,
  //     // data: user,
  //   });
});
