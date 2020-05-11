var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  title: String,
  img: String,
  description: String
});

let Book = mongoose.model('Book', userSchema, 'booksList');
module.exports = Book;