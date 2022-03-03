var express = require('express');
var userController = require('../app/controllers/user')
var router = express.Router();

router.get('/check-value', userController.CreateUser);
module.exports = router;
