var mongoose = require('mongoose');

var transSchema = new mongoose.Schema({
  userId: String,
  bookId:  String,
  isComplete: Boolean
});

let Trans = mongoose.model('Trans', transSchema, 'transactions');
module.exports = Trans;