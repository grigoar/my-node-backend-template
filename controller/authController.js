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
