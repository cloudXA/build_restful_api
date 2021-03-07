const Category = require('../models/category');
const Exercise = require('../models/exercise');
const mongoose = require('mongoose');

/**
 * 根据分类获取对应的题目
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const category_get_title = (req, res, next) => {
  Category.findById({ _id: req.body.id })
          .populate('exercises', 'title')
          .exec()
          .then(doc => {
            if(!doc) {
              res.status(404).json({
                message: 'exercises not found'
              })
            }
            res.status(200).json({
              result: doc
            })
          })
          .catch(error => {
            res.status(500).json({
              error: error
            })
          })

  
}

/**
 * 根据分类获取所有的解析、答案、评论all等等
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const category_get_all = (req, res, next) => {
  Category.findById({ _id: req.body.id })
          .populate('exercises')
          .exec()
          .then(doc => {
            if(!doc) {
              res.status(404).json({
                message: 'exercises not found'
              })
            }
            res.status(200).json({
              result: doc
            })
          })
          .catch(error => {
            res.status(500).json({
              error: error
            })
          })

  
}


// 指定题目分类
const category_post_all = (req, res, next) => {
  Exercise.findById({ _id: req.body.id })
          .then(data => {
            // 新增分类,指定exercise 的id
            const category = new Category({
              _id: mongoose.Types.ObjectId(),
              name: req.body.name,
              exercises: [req.body.id]
            })
            return category.save()
          })
          .then(doc => {
            // 在分类中指定
            res.status(200).json({
              result: doc,
              message: '指定完成'
            })
          })
          .catch(error => {
            res.status(500).json({
              error: error.message
            })
          })
  
}

module.exports = { category_get_all,  category_post_all, category_get_title };