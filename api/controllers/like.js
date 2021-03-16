const Exercise = require('../models/exercise');
const mongoose = require('mongoose');

const like_add_post = (req, res, next) => {
  Exercise.findById(req.body.id)
          .select('likes isLiked')
          .exec()
          .then( async data => {
            data.likes++
            data.isLiked = true;
            await data.save();
            res.status(200).json({
              data
            })

          })
}

const like_cancel_post = (req, res, next) => {
  Exercise.findById(req.body.id)
          .select('likes isLiked')
          .exec()
          .then( async data => {
            console.log(data, 'data')
            if(data.likes > 0) {
              data.likes--
              data.isLiked = false;
              await data.save();
              res.status(200).json({
                data
              })
            } else {
              res.status(200).json({
                data
              })
            }
            
          })
          .catch(error => {
            res.status(500).json({
              error
            })
          })
}

const like_get = (req, res, next) => {
  Exercise.findById(req.body.id)
          .select('likes')
          .exec()
          .then(data => {
            res.status(200).json({
              data
            })
          })
          .catch(error => {
            res.status(500).json({
              error
            })
          })
}

module.exports = { like_add_post, like_cancel_post, like_get }