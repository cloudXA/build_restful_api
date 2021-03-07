const express = require('express');
const router = express.Router();

const commentController = require('../controllers/comment');

router.get('/', commentController.comment_get_all);
router.post('/', commentController.comment_post_all);

module.exports = router;