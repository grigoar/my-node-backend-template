const express = require('express');

const commentController = require('../controller/commentController');

const router = express.Router();

router
  .route('/')
  .get(commentController.getAllComments)
  .post(commentController.createComment);

module.exports = router;
