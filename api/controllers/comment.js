const Comment = require('../models/comment');
const Exercise = require('../models/exercise');
const mongoose = require('mongoose');

//预制并获取数据(预制数据存储到数据库、并获取)

/**
 * 根据题目查看评论内容
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const comment_get_all = (req, res, next) => {
  Exercise.findById({ _id: req.body.id })
          .populate('comments')
          .exec()
          .then(data => {
            res.status(200).json({
              data
            })
          })
          .catch(error => {
            res.status(500).json({
              error: error
            })
          })
  
}

/**
 * 根据题目添加评论内容
 */
const comment_post_all = (req, res, next) => {

  Exercise.findById({ _id: req.body.id })
          .then(async (data) => {            
            const comment = new Comment({
              _id: mongoose.Types.ObjectId(),
              comment: req.body.comment,
            })
            await comment.save();
            // 如何给已经存在的数据库模型添加相应的ref的属性
            data.comments.push(comment.id)
            return data.save()
          })
          .then(doc => {
            res.status(200).json({
              doc,
              message: '评论添加完成'
            })
          })
          .catch(error => {
            res.status(500).json({
              error: error
            })
          })
  
}

module.exports = { comment_get_all,  comment_post_all};