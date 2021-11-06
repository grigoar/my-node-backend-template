const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.signup = catchAsync(async (req, res) => {
  // console.log(req.params.id);
  const newUser = await User.create(req.body);
  res.status(200).json({
    status: 'success',
    data: newUser,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }

  const user = await User.findOne({ email }).select('+password');

  const correct = await user.correctPassword(password, user.password);
  if (!correct) {
    return next(new AppError('Incorrect email or password!', 401));
  }

  res.status(200).json({
    status: 'success',
    data: user,
  });
});
