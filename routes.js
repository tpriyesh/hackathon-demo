var express = require('express')
var router = express.Router()

var user =require('./controllers/user')
var uploadController = require('./controllers/upload');
var restaurant = require('./controllers/restaurant');

router.use('/user', user);
router.use('/restaurant', restaurant);
router.use("/uploads", uploadController);

module.exports = router

