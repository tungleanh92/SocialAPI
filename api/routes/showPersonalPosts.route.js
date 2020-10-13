const express = require('express');
const router = express.Router();
const controller = require('../controllers/showPersonalPost.controller')

router.get('/', controller.showPersonalPosts);

module.exports = router;