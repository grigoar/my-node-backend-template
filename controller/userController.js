const User = require('../models/userModel');

exports.createUser = async (req, res) => {
  // console.log(req.params.id);
  try {
    const newUser = await User.create(req.body);
    res.status(200).json({
      status: 'success',
      data: newUser,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: 'success',
      data: users,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
