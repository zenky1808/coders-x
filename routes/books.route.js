const express = require('express');
const router = express.Router();
const db = require('../db')
const shortid = require('shortid');
var multer  = require('multer');
var upload = multer({ dest: './public/uploads/' })

const controller = require('../controllers/books.controller');
//Home book
router.get("/", controller.index);

// Create books
router.get('/create', controller.getCreate);
router.post('/create',upload.single('image') ,controller.postCreate);

// View book
router.get('/view', controller.viewBook);

// remove book
router.get('/:id/delete',controller.removeBook)

// Update Books
router.get('/:id/update',controller.getUpdateBook)

router.post("/:id/update", upload.single('image'),controller.postUpdateBook);



module.exports = router;
