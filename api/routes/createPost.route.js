const express = require('express');
const router = express.Router();
const controller = require('../controllers/createPost.controller')

router.post('/', controller.createPost);

module.exports = router;