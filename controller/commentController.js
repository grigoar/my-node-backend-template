const Comment = require('../models/commentModel');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllComments = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.userId) filter = { tour: req.params.userId };
  const comments = await Comment.find(filter);
  if (!comments) {
    return next(new AppError('The comments were not found!', 404));
  }

  res.status(200).json({
    status: 'Success',
    data: comments,
  });
});
// exports.getAllComments = catchAsync(async (req, res, next) => {
//   const comments = await Comment.find();
//   if (!comments) {
//     return next(new AppError('The comments were not found!', 404));
//   }

//   res.status(200).json({
//     status: 'Success',
//     data: comments,
//   });
// });
exports.getOneComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    return next(new AppError("The comment specified couldn't be found!", 404));
  }

  res.status(200).json({
    status: 'success',
    data: comment,
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

exports.updateComment = catchAsync(async (req, res, next) => {
  const updatedComment = await Comment.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedComment) {
    return next(
      new AppError('Something went wrong. The comment was not updated.', 404)
    );
  }

  res.status(200).json({
    status: 'success',
    data: updatedComment,
  });
});
exports.deleteComment = catchAsync(async (req, res, next) => {
  const deletedComment = await Comment.findByIdAndDelete(req.params.id);

  if (!deletedComment) {
    return next(new AppError('The comment to delete was not found!', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
