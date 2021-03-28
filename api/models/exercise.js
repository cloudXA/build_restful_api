const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = mongoose.Schema({
  _id: Schema.Types.ObjectId,
  title: { type: String, require: true },                                       // 标题
  choose: [{ type: Object }],                                                   // 选项
  analysis: { type: String },                                                   // 解析
  solution: [ {type: String} ],                                                 // 答案
  shortSolution: { type: String },                                              // 简答的答案(联动查询赋值)
  likes: { type: Number, default: 0 },                                          // 喜欢量
  views: { type: Number, default: 0 },                                          // 浏览量
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],                  // 评论数
  property: { type: Number },
  type: { type: Number },
  isLiked: { type: Boolean, default: false },                                    // 是否喜欢
  company: { type: String }                                                      // 所属公司

})

module.exports = mongoose.model('Exercise', exerciseSchema);