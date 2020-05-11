const db = require('../db');
const shortid = require('shortid');

module.exports.index = (req, res) =>{
  res.render('trans/index',{
    transactions: db.get('transactions').value()
  })
}

module.exports.getCreate = (req, res) => {
  var users = db.get('usersList').value();
  var books = db.get('booksList').value();
  res.render('trans/create', {
    users: users,
    books: books
  });
  res.render('trans/create')
}

module.exports.postCreate = (req, res) => {
  req.body.id = shortid.generate();
  db.get("transactions")
    .push(req.body)
    .write();
  res.redirect("/trans");
}

module.exports.removeId = (req, res) =>{
  let id = (req.params.id);
  db.get('transactions').remove({id: id}).write();
  res.redirect('/trans')
}

module.exports.isComplete = (req, res) => {
  db.read();
  let id = req.params.id;
  let isComplete = db.get("transactions")
                      .find({id:id}).value()
  res.render("trans/view",{
    isComplete: isComplete
  })
}

module.exports.postIsComplete = (req, res) =>{
  let id = req.params.id;
    db.get("transactions")
    .find({ id: id })
    .assign({ isComplete: req.body.isComplete })
    .write();
  res.redirect("/trans");
}