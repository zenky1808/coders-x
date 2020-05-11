var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  avatar: String,
  wrongLoginCount: Number
});

let User = mongoose.model('User', userSchema, 'usersList');
module.exports = User;