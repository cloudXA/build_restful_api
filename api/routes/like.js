const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const LikesController = require('../controllers/like');


router.post('/add', LikesController.like_add_post)
router.post('/cancel', LikesController.like_cancel_post)
router.get('/', LikesController.like_get)


module.exports = router;