const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classifySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  top: { type: String },
  medium: { type: Object }
})