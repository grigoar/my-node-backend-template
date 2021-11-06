const User = require('../models/userModel');

const factory = require('./handlerFactory');
// const catchAsync = require('../utils/catchAsync');
// const AppError = require('../utils/appError');

exports.getOneUser = factory.getOne(User);
exports.getAllUsers = factory.getAll(User);
// exports.createUser = factory.createOne(User);
exports.deleteUser = factory.deleteOne(User);
exports.editUser = factory.updateOne(User);
exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'This route is not defined! Please use the sign in instead',
  });
};

// exports.createUser = catchAsync(async (req, res) => {
//   // console.log(req.params.id);
//   const newUser = await User.create(req.body);
//   res.status(200).json({
//     status: 'success',
//     data: newUser,
//   });
// });

// exports.getOneUser = catchAsync(async (req, res, next) => {
//   const newUser = await User.findById(req.params.id);

//   if (!newUser) {
//     return next(new AppError('No user found with that ID', 404));
//   }

//   res.status(200).json({
//     status: 'success',
//     data: newUser,
//   });
// });

// exports.getAllUsers = catchAsync(async (req, res, next) => {
//   const users = await User.find();

//   if (!users) {
//     return next(new AppError('No users found', 404));
//   }
//   res.status(200).json({
//     status: 'success',
//     data: users,
//   });
// });

// exports.editUser = catchAsync(async (req, res, next) => {
//   const newUser = await User.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true,
//   });

//   if (!newUser) {
//     return next(new AppError('No user found with that id', 404));
//   }

//   res.status(200).json({
//     status: 'success',
//     data: {
//       newUser,
//     },
//   });
// });

// exports.deleteUser = catchAsync(async (req, res, next) => {
//   const deleted = await User.findByIdAndDelete(req.params.id);

//   if (!deleted) {
//     return next(new AppError('No user found with that Id to delete!', 404));
//   }
//   res.status(204).json({
//     status: 'success',
//     data: null,
//   });
// });
