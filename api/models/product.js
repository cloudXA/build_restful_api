const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true }, 
  price: { type: Number },
  productImage: { type: String },
  url: { type: String },
  description: { type: String }
});

module.exports = mongoose.model('Product', productSchema);