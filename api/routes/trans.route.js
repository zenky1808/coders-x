const express = require('express');
const router = express.Router();
const db = require('../db')
const shortid = require('shortid');
const controller = require('../controllers/trans.controller');

router.get('/', controller.index);

router.get("/create", controller.getCreate);

router.post("/create", controller.postCreate);

router.get("/:id/delete", controller.removeId);

router.get("/:id/view", controller.isComplete);

router.post("/:id/view", controller.postIsComplete);

module.exports = router;