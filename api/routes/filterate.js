const express = require('express');
const router = express.Router();

const filterateController = require('../controllers/filterate.js');

router.post('/top', filterateController.category_top_post);
router.get('/top', filterateController.category_top_get);
router.post('/medium', filterateController.category_medium_post);
router.get('/medium', filterateController.category_medium_get);
router.get('/basic', filterateController.category_basic_get);
router.post('/basic', filterateController.category_basic_post);
router.post('/assignBasicExercise', filterateController.category_exercise_assign);
router.get('/basicExercise', filterateController.categoryBasic_exercise_get);


module.exports = router;