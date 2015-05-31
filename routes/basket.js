var express = require('express');
var router = express.Router();
var flash = require('connect-flash');
var mongoose = require( 'mongoose' );
var users = mongoose.model( 'users', users );
var campaigns = mongoose.model( 'campaigns', campaigns );

/* GET home page. */
router.get('/', function(req, res, next) {
	return res.render('basket');
});
module.exports = router;
