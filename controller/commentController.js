const Comment = require('../models/commentModel');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllComments = catchAsync(async (req, res, next) => {
  const comments = await Comment.find();
  if (!comments) {
    return next(new AppError('The comments were not found!', 404));
  }

  res.status(200).json({
    status: 'Success',
    data: comments,
  });
});

exports.createComment = catchAsync(async (req, res, next) => {
  const newComment = await Comment.create(req.body);

  if (!newComment) {
    return next(new AppError("The comment couldn't be created", 404));
  }

  res.status(200).json({
    status: 'Success',
    data: newComment,
  });
});