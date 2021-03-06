const Exercise = require('../models/exercise');
const mongoose = require('mongoose');


const exercise_get_all = (req, res, next) => {
  Exercise.find()
    .exec()
    .then( doc => {
      console.log(doc, 'doc')
      doc.forEach(async item => {
        item.views ++
        await item.save() 
      })
      res.status(200).json({
        result: doc,
        total: doc.length
      })
    })
  
}

const exercise_post_all = (req, res, next) => {
  const exercise = new Exercise({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,                        // 题目
    choose: req.body.choose,                     // 选项
    analysis: req.body.analysis,                  // 解析
    solution: req.body.solution,                  // 答案
    shortSolution: req.body.shortSolution,      // 简答的答案
    property: req.body.property,                // 1:单选 2：多选 3: 判断 4: 简答
    type: req.body.type,                         // 1: 公司题库 2 面试题库
    company: req.body.company,           
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

const exercise_update = (req, res, next) => {
  Exercise.findByIdAndUpdate({ _id: req.body.id }, { company: req.body.company })
          .then(doc => {
            res.status(200).json({
              doc
            })
          })
          .catch(error => {
            res.status(500).json({
              error
            })
          }) 

}

// 基于id获取所有的题目信息，（包括答案）
const exercise_get_id = (req, res, next) => {
  let shield;
  if(req.query && req.query.answer == 0) { // 0屏蔽下列答案  1放开所有答案
    shield = '-analysis -solution -comments -isLiked -likes -views'
  } else {
  
    shield = "-__v";
  }

  // 屏蔽吊答案
  Exercise.findById({ _id: req.params.id }, `${shield}`)
    .then(doc => {
      res.status(200).json({
        doc,
      })
    })
    .catch(error => {
      res.status(500).json({
        error,
      })
    })
}

module.exports = { exercise_get_all,  exercise_post_all, exercise_update, exercise_get_id };
