const express = require('express');
const router = express.Router();
const controller = require('../controllers/showCmts.controller')

router.post('/', controller.showCmts);

module.exports = router;