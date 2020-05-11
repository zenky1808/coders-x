const express = require('express');
const db = require('../db')
const shortid = require('shortid');
const bcrypt = require('bcrypt')
var cloudinary = require('cloudinary').v2;
// cloudinary.config({ 
//   cloud_name: 'zenky', 
//   api_key: '185533257278471', 
//   api_secret: 'UTMd1W-IwbRGPMTeg3yc1L7lLIA' 
// });

module.exports.index = (request, response) => {
  response.render('users/index',{
    usersList: db.get('usersList').value()
  });
}

// Create user
module.exports.getCreate = (req, res) =>{
  res.render('users/create')
}

module.exports.postCreate = (req, res) =>{
  req.body.avatar = req.file.path.split("/").slice(1).join('/');
  console.log(req.file.path)
  console.log(req.body.avatar)
  let errors = [];
  if(!req.body.name){
    errors.push('Name is required ! ');
  }
  if(!req.body.email){
    errors.push('Email is required !');
  }
  if(req.body.name.length > 30){
    errors.push('Name cannot exceed 30 characters !');
  }
  if(errors.length){
    res.render('users/create',{
      errors: errors,
      values: req.body
    });
    return;
  }

   bcrypt.hash(req.body.password, 10, function(err, hash) {
    var hash = hash;
      var newUser = {
    name: req.body.name,
    email: req.body.email,
    password: hash,
    wrongLoginCount: 0,
    avatar: req.body.avatar,
    id: shortid.generate()
    };
    db.get('usersList').push(newUser).write();
    console.log(newUser)
  });
  res.redirect('/users');
}

// Remove user
module.exports.removeUser = (req, res) =>{
  let id = (req.params.id);
  db.get('usersList').remove({id: id}).write();
  res.redirect('/users')
}

// Update user
module.exports.postUpdateUser = (req, res) => {
  db.read();
  var id = req.params.id;
  req.body.avatar = req.file.path.split("/").slice(1).join('/');
  console.log(req.body.avatar)
  db.get("usersList")
    .find({ id: id })
    .assign({ name: req.body.name })
    .assign({ avatar: req.body.avatar})
    .write(); 
  res.redirect("/users");
}

module.exports.getUpdateUser = (req, res) =>{
  db.read();
  var id = req.params.id;
  var users = db
    .get("usersList")
    .find({ id: id })
    .value();
  res.render("users/update", {
    users: users
  });
}