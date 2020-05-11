const db = require('../db');

module.exports.index = (req, res ) => {
  var page = parseInt(req.query.page) || 1;
  var perPage = db.get('products').value().slice((page-1)*4, page*4);
  res.render('products/index', {
    perPage: perPage,
    page: page
  });
}