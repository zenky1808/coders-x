const db = require('../db')
const shortid = require('shortid');

module.exports.auth = (req, res, next) =>{
  var user = db.get('usersList')
  .find({id : req.signedCookies.userId}).value();
  if(!req.signedCookies.userId){
    res.redirect('/auth/login');
    return;
  }
  if(!user){
    res.redirect(('/auth/login'));
    return;
  }
  
  res.locals.user = user;
  next();
}