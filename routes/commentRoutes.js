const express = require('express');

const commentController = require('../controller/commentController');
const authController = require('../controller/authController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(authController.protect, commentController.getAllComments)
  .post(authController.protect, commentController.createComment);

router
  .route('/:id')
  .get(commentController.getOneComment)
  .patch(commentController.updateComment)
  .delete(commentController.deleteComment);

module.exports = router;
