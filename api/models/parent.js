const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const parentSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String },
  container: { type: Schema.Types.ObjectId, ref: 'Son' }

})

module.exports = mongoose.model('Parent', parentSchema);