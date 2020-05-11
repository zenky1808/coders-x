var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  name: String,
  img: String,
  description: String
});

let Product = mongoose.model('Product', userSchema, 'products');
module.exports = Product;