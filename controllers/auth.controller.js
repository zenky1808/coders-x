const db = require('../db')
const md5 = require('md5');
const bcrypt = require('bcrypt')
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY.trim());
const shortid = require('shortid');
 var errors = [];

module.exports.login = (request, response) => {
  response.render('auth/login');
}

module.exports.postLogin = (req, res) => {
  let email = req.body.email;
  let pass = (req.body.password);
  let user = db.get('usersList').find({email : email}).value();
  
  
  if(!user){
    res.render('auth/login',{
      errors: [
        'Email is does not exist'
      ],
      values: res.body
    });
    return;
  } 
  
  if(db.get('usersList').find({ id: user.id}).value().wrongLoginCount===4) {
    const msg = {
      to: user.email,
      from: 'bezenky.95@gmail.com',
      subject: 'Wrong PassWord',
      html: '<strong> Wrong Password</strong>Mail addim contact support: bezenky.95@gmail.com </a>'
    };
    sgMail
      .send(msg)
      .then((res) => {
        console.log(res);
      }, error => {
        console.error(error);

    if (error.response) {
        console.error(error.response.body)
      }
    });
    res.render('auth/login', {
      errors: [
        'Wrong Hash Password Because You Comfirm PassWord Wrong 4 times in a row'
      ]
    });
    return;
  }

bcrypt.compare(pass, user.password, function(err, result) {
    // result == true
  if(result == false) {
    db.get('users').find({ id: user.id}).update('wrongLoginCount', n => n+1).write();
    res.render('auth/login', {
      errors: [
        'Wrong PassWord'
      ],
      value: req.body.email
    });
  }else{
      res.cookie('userId', user.id,{
        signed: true
  });
      res.redirect('/users');
  }
});
}