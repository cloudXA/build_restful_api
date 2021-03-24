const express = require('express');
const router = express.Router();

const filterateController = require('../controllers/filterate.js');

router.post('/top', filterateController.category_top_post);
router.get('/top', filterateController.category_top_get);
router.post('/medium', filterateController.category_medium_post);
router.get('/medium', filterateController.category_medium_get);

module.exports = router;