const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerReply = Schema({
    _id: mongoose.Schema.Types.ObjectId,
    exerId: { type: String },  // 题目id
    reply: [{ type: Object }]  // 用户选中的选项信息集合
})

module.exports = mongoose.model('ExerReply', exerReply);