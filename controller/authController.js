/* eslint-disable no-param-reassign */
/* eslint-disable arrow-body-style */
const { promisify } = require('util');
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
  const newUser = await User.create(req.body);
  // const newUser = await User.create({
  //   name: req.body.name,
  //   email: req.body.email.toLowerCase(),
  //   password: req.body.password,
  //   passwordConfirm: req.body.passwordConfirm,
  //   //the role or any other resources should be changed securely after
  //   // role: req.body.role
  // });

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

exports.logout = (req, res) => {
  //to be implemented
  //logout the user by resetting the cookie
};

exports.protect = catchAsync(async (req, res, next) => {
  //1)Getting the token and see if it is there
  let token;
  // console.log(req.headers);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  //  else if (req.cookies.jwt) {
  //   token = req.cookies.jwt;
  // }
  // console.log(token);

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access!', 401)
    );
  }

  //2)Verification Token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log(decoded);

  const currentUser = await User.findById(decoded.id);

  //3) Check if user still exists- incase it was deleted the token should not be available anymore
  if (!currentUser) {
    return next(
      new AppError('The user belonging to the token does not longer exist', 401)
    );
  }

  //4)Check if user changed password after the JWT was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please login again.', 401)
    );
  }

  //Grant Access to protected route
  req.user = currentUser;
  next();
});
