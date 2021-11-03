const User = require('../models/userModel');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createUser = catchAsync(async (req, res) => {
  // console.log(req.params.id);
  const newUser = await User.create(req.body);
  res.status(200).json({
    status: 'success',
    data: newUser,
  });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  if (users !== 'ss') {
    return next(
      new AppError('Example: The users are not received correctly. ')
    );
  }
  res.status(200).json({
    status: 'success',
    data: users,
  });
});
