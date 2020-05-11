var User = require('../../models/user.model');

module.exports.postLogin = async function (req, res) {
  var users = await User.create(req.body);
  res.json(users);
};