var express = require('express');
var router = express.Router();

//database
var mongoose = require( 'mongoose' );
var users  = mongoose.model( 'users', users );

/* GET users listing. */
router.get('/', function(req, res, next) {
	users.find({}, function(err, allUsers){
		return res.json(allUsers);
	});
});

module.exports = router;
