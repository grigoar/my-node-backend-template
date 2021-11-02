exports.createUser = (req, res) => {
  // console.log(req.params.id);

  res.status(200).json({
    status: 'success',
    data: req.body,
  });
};

exports.getAllUsers = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: 'user list',
  });
};
