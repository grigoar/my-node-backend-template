const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createOne = (Model) =>
  catchAsync(async (req, res) => {
    // console.log(req.params.id);
    const newDoc = await Model.create(req.body);
    res.status(200).json({
      status: 'success',
      data: newDoc,
    });
  });

exports.getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const newDoc = await Model.findById(req.params.id);

    if (!newDoc) {
      return next(new AppError('No entry found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: newDoc,
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.params.userId) filter = { user: req.params.userId };
    const docs = await Model.find(filter);

    if (!docs) {
      return next(new AppError('No entries found', 404));
    }
    res.status(200).json({
      status: 'success',
      data: docs,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const newEntry = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!newEntry) {
      return next(new AppError('No entry found with that id', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        newEntry,
      },
    });
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const deleted = await Model.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return next(new AppError('No entry found to delete!', 404));
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });
