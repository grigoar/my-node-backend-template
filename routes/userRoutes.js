const express = require('express');
const userController = require('../controller/userController');
const commentRouter = require('./commentRoutes');
const authController = require('../controller/authController');

const router = express.Router();

router.use('/:userId/comments', commentRouter);

router.post('/signup', authController.signup);
router.post('/login', authController.login);
// router.route('/signup').post(authController.signup);

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
