const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const ExerReply = require('../models/exerReply');

// 注册
const user_signup = (req, res, next) => {
  User.find({ email: req.body.email }) // 首先使用Model.find查看email是否已经存在
    .exec()
    .then(user => {
      console.log(user,'user')
      if (user.length >= 1) {
          return res.status(409).json({
            message: 'Mail exists'
          });
      } else {
          bcrypt.hash(req.body.password, 10, (err, hash)  => {
            if (err) {
              return res.status(500).json({
                error: err.message
              })
            } else {
              const user = new User({       // 创建user数据
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash
              });
              user
                .save()
                .then(result => {
                  res.status(201).json({
                    message: 'User created',
                    userInfor: result
                  });
                })
                .catch(err => {
                  res.status(500).json({
                    error: err
                  })
                });
            }
          })
      }
      
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    });
  
}

// 登录
const user_login = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) { // 登录时用户不存在
        return res.status(401).json({ //no email or the password is wrong
          message: 'Auth failed '
        })
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if(result) {
          // token仅仅是encoded in a base 64 编码成64位  not encrypted (加密)
          const token = jwt.sign(  //synchronously同步设置token
            {
              email: user[0].email,
              userId: user[0]._id
            },
            'secret',
            {
              expiresIn: '1h'
            }
          )
          return res.status(200).json({
            message: 'Auth successful',
            token: token,
            userInfor: user
          })
        } else {
          return res.status(401).json({
            message: 'Auth failed',
            error: err
          });
        }
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    })
}

// 删除用户信息
const user_delete = (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'User deleted'
      })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
}


// 上传用户信息


// 获取用户信息
const user = (req, res, next) => {
  User.findById({ _id: req.params.userId })
    .select('_id email')
    .exec()
    .then(result => {
      res.status(200).json({
        result
      })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
}

// 用户基于题目选中的答案信息关联到exerReply表中
const user_add_reply = (req, res, next) => {
  User.findById({ _id: req.body.userId })
    .then(async doc => {

      // 建立用户做题响应模型
      const exerReply = new ExerReply({
        _id: new mongoose.Types.ObjectId(),
        exerId: req.body.exerId,
        reply: {
          reply: req.body.reply,
          userId: req.body.userId,
          exerId: req.body.exerId
        }
      })
      await exerReply.save();
      
      // 同一个exerId唯一对应一个exerReply模型
      if(doc.exerReply.length) {
        let exerId = req.body.exerId;
        let n = 0, length = doc.exerReply.length;
        doc.exerReply.forEach(async (item,index) => {
          ExerReply.findById({ _id: item }) //每一个响应信息详情
                  .then(data => { // 同一个exerId的话，修改之
                    if(data && data["reply"][0].exerId === exerId) {
                      doc.exerReply.splice(index, 1, exerReply._id);
                      data.remove();
                      return doc.save()
                    } else { // 在doc。exerReply的最后一个item遍历时，将exerReply传入_id;
                      if(++n === length) {
                        doc.exerReply.push(exerReply._id);
                        return doc.save();


                      }
                    }
                  })
        })
      } else { //在用户关联的exerReply为空时，直接push进_id
        doc.exerReply.push(exerReply._id)
        return doc.save();
      }
    })
    .then(result => {
      res.status(200).json({
        result
      })
    })
    .catch(err => {
      res.status(500).json({
        err
      })
    })


}


/**
 * 移除user关联的exerReply字段下的所有document
 */
const user_remove_reply = (req, res, next) => {
  User.findById({ _id: req.body.userId })
      .select('exerReply')
      .then(data => {
        console.log(data)
      })
      .catch(err => {
        console.log(err)
      })

}

// 数据题目答案回显
const user_reply_callback = (req, res, next) => {
  User.findById({ _id: req.body.userId })
      .populate('exerReply')
      .then(data => {
        res.status(200).json({
          data
        })
      })
      .catch(err => {
        res.status(500).json({
          err
        })
      })
}

const user_reply_remove = (req, res, next) => {
  User.findById({ _id: req.body.userId })
      .then(async data => {
        // data.remove();
        // data.remove("exerReply")
        data.exerReply = [];
        await data.save();
        // console.log(result)

        res.status(200).json({
          data,
          message: 'remove success',
          retCode: 0
        })
      })
      .catch(err => {
        res.status(500).json({
          message: 'remove error'
        })
      })


}

module.exports = { 
  user_signup,  
  user_login, 
  user_delete, 
  user, 
  user_add_reply, 
  user_reply_callback,
  user_reply_remove
}