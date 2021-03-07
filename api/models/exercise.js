const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = mongoose.Schema({
  _id: Schema.Types.ObjectId,
  title: { type: String, require: true },
  choose: { type: String },
  answer: { type: String },
  likes: { type: Number },
  views: { type: Number },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],

})

module.exports = mongoose.model('Exercise', exerciseSchema);