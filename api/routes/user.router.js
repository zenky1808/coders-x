const express = require('express');
const router = express.Router();
const db = require('../db')
const shortid = require('shortid');
var multer  = require('multer');
var upload = multer({ dest: './public/uploads/' })

const controller = require('../controllers/users.controller');

router.get("/", controller.index);

// Create user
// router.get('/create', controller.getCreate);
// router.post('/create',upload.single('avatar') ,controller.postCreate);

// // remove user
// router.get('/:id/delete',controller.removeUser)

// // Update user
// router.get('/:id/update',controller.getUpdateUser)
// router.post("/:id/update",upload.single('avatar'),controller.postUpdateUser);

// cookie
// router.get('/cookie', (req, res) =>{
//   res.cookie('user-id', 12345)
//   res.send('hello')
// })

module.exports = router;