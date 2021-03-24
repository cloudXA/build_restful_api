const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const grandpaSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String },
  containers: [{ type: Schema.Types.ObjectId, ref: 'Parent' }]

})

module.exports = mongoose.model('Grandpa', grandpaSchema);