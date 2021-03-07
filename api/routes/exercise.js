const express = require('express');
const router = express.Router();

const exerciseController = require('../controllers/exercise');

router.get('/', exerciseController.exercise_get_all);
router.post('/', exerciseController.exercise_post_all);

module.exports = router;