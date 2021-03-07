const mongoose = require('mongoose');

const categoryInit = [
  {
    name: '单选',
    _id: mongoose.Types.ObjectId()
  },
  {
    name: '多选',
    _id: mongoose.Types.ObjectId()
  },
  {
    name: '判断',
    _id: mongoose.Types.ObjectId()
  },
  {
    name: '简答',
    _id: mongoose.Types.ObjectId()
  }
];

module.exports = categoryInit;