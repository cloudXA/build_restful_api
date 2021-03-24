const Grandpa = require('../models/grandpa');
const Parent = require('../models/parent');
const Son = require('../models/son');
const mongoose = require('mongoose');
const filterate = require('../initData/filterate');


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 建立category top
 */
const category_top_post = (req, res, next) => {
  req.body.names.forEach(async item => {
    
    try {
      await Grandpa.create({
        _id: new mongoose.Types.ObjectId(),
        name: item
      })
      
    } catch (error) {
      res.status(500).json({
        error
      })
    }

  })
  res.status(200).json({
    message: 'ok'
  })
  
}

const category_top_get = (req, res, next) => {
  Grandpa.find()
          .then(result => {
            res.status(200).json({
              result
            })
          })
          .catch(error => {
            res.status(500).json({
              error: error
            })
          })

}

/**
 * 添加medium子分类
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const category_medium_post = (req, res, next) => {
  Grandpa.findById({ _id: req.body.id })
          .then(async data => {
            const parent = new Parent({
              _id: new mongoose.Types.ObjectId(),
              name: req.body.name 
            })
            await parent.save();
            data.containers.push(data.id)
            return data.save()
          })
          .then(doc => {
            res.status(200).json({
              doc,
              message: '子分类添加完成'
            })
          })
          .catch(error => {
            res.status(500).json({
              error
            })
          })
}


/**
 * 获取medium子分类
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const category_medium_get = (req, res, next) => {
  Grandpa.findById({_id: req.body.id} )
          // .select('name container')
          .populate('containers')
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




module.exports = { 
  category_top_post,
  category_top_get,
  category_medium_post,
  category_medium_get
};