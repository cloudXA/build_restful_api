const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = mongoose.Schema({
  _id: Schema.Types.ObjectId,
  comment: { type: String },
  user: { type: Schema.Types.ObjectId },

})

module.exports = mongoose.model('Comment', commentSchema);