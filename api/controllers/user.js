const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const user_signup = (req, res, next) => {
  console.log(User, 'User')
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
                error: err
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
                  console.log(result);
                  res.status(201).json({
                    message: 'User created',
                    userInfor: result
                  });
                })
                .catch(err => {
                  console.log(err);
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
            token: token
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

const user_delete = (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'User deleted'
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    })
}


module.exports = { user_signup,  user_login, user_delete }