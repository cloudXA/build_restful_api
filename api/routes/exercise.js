const express = require('express');
const router = express.Router();

const exerciseController = require('../controllers/exercise');

router.get('/', exerciseController.exercise_get_all);
router.get('/:id', exerciseController.exercise_get_id)
router.post('/', exerciseController.exercise_post_all);
router.post('/update', exerciseController.exercise_update)

module.exports = router;