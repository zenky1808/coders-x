const db = require('../db')
const shortid = require('shortid');

module.exports = (req, res, next) => {
  let sessionId = shortid.generate()
  if(!req.signedCookies.sessionId){
    res.cookie('sessionId',sessionId ,{
        signed: true
    })
  }
  let newSession = {
    id: sessionId
  }
  console.log(newSession)
  db.get('sessions').push(newSession).write()
  next()
}