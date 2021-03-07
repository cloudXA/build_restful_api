const Exercise = require('../models/exercise');
const mongoose = require('mongoose');


const exercise_get_all = (req, res, next) => {
  Exercise.find()
    .exec()
    .then(doc => {
      res.status(200).json({
        result: doc,
      })
    })
  
}

const exercise_post_all = (req, res, next) => {
  const exercise = new Exercise({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    choose: req.body.choose,
  })
  exercise
      .save()
      .then(result => {
        res.status(200).json({
          result: result,
          message: '创建完成'
        })
        
      })
      .catch(error => {
        error: error
      })
  
}

module.exports = { exercise_get_all,  exercise_post_all};