const express = require('express');
const router = express.Router();
const controller = require('../controllers/showPosts.controller')

router.get('/', controller.showPosts);

module.exports = router;