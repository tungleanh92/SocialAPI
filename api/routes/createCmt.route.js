const express = require('express');
const router = express.Router();
const controller = require('../controllers/createCmt.controller')

router.post('/', controller.createComment);

module.exports = router;