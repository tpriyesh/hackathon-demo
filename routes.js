var express = require('express')
var router = express.Router()

var user =require('./controllers/user')
var uploadController = require('./controllers/upload');

router.use('/user', user)
router.use("/uploads", uploadController);

module.exports = router

