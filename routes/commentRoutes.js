const express = require('express');

const commentController = require('../controller/commentController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(commentController.getAllComments)
  .post(commentController.createComment);

router
  .route('/:id')
  .get(commentController.getOneComment)
  .patch(commentController.updateComment)
  .delete(commentController.deleteComment);

module.exports = router;
