var Trans = require('../../models/trans.model');

module.exports.index = async function (req, res) {
  var trans = await Trans.create(req.body);
  res.json(trans);
};