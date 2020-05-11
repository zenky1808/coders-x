const express = require('express');
const db = require('../db')
const shortid = require('shortid');

module.exports.index = (request, response) => {
  response.render('books/index',{
    booksList: db.get('booksList').value()
  });
}

module.exports.viewBook = (request, response) => {
  response.render('books/view',{
    booksList: db.get('booksList').value()
  });
}

//create books
module.exports.getCreate = (req, res) =>{
  res.render('books/create')
}

module.exports.postCreate = (req, res) =>{
  req.body.image = req.file.path.split("/").slice(1).join('/');
  let newBook = {
    title: req.body.title,
    description: req.body.description,
    image: req.body.image,
    id: shortid.generate()
  }
  console.log(req.body.image)
  console.log(newBook)
  db.get('booksList').push(newBook).write();
  res.redirect('/books');
}

//remove book
module.exports.removeBook = (req, res) =>{
  let id = (req.params.id);
  db.get('booksList').remove({id: id}).write();
  
  res.redirect('/books')
}

//update book
module.exports.getUpdateBook = (req, res) =>{
  db.read();
  var id = req.params.id;
  var books = db
    .get("booksList")
    .find({ id: id })
    .value();
  res.render("books/update", {
    books: books
  });
}

module.exports.postUpdateBook = (req, res) => {
  db.read();
  var id = req.params.id;
  req.body.image = req.file.path.split("/").slice(1).join('/');
  db.get("booksList")
    .find({ id: id })
    .assign({ title: req.body.title })
    .assign({ description: req.body.description })
    .assign({ image: req.body.image })
    .write();
  res.redirect("/books");
}
