const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sonSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String },
  exercises: [{ type: Schema.Types.ObjectId, ref: 'Exercise' }]

})

module.exports = mongoose.model('Son', sonSchema);