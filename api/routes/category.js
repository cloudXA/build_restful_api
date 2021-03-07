const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/category');

router.get('/', categoryController.category_get_all)
router.get('/title', categoryController.category_get_title)
router.post('/', categoryController.category_post_all)



module.exports = router;