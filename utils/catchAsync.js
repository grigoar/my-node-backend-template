//we need to return a function that will be called by the express
module.exports = (fn) => (req, res, next) => {
  //   fn(req, res, next).catch((err) => next(err));
  fn(req, res, next).catch((err) => next(err));
};
