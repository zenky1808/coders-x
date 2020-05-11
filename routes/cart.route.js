const express = require('express');
const router = express.Router();
const db = require('../db')
const shortid = require('shortid');

const controller = require('../controllers/cart.controller');

router.get('/add/:booksId', controller.addToCart);


module.exports = router;