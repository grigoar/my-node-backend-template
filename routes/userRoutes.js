const express = require('express');
const userController = require('../controller/userController');
const commentRouter = require('./commentRoutes');

const router = express.Router();

router.route('/:userId/comments', commentRouter);

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getOneUser)
  .patch(userController.editUser)
  .delete(userController.deleteUser);

module.exports = router;
