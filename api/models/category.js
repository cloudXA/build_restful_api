const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, require: true },
  exercises: [{ type: Schema.Types.ObjectId, ref: 'Exercise'}]
})

module.exports = mongoose.model('Category', categorySchema);
