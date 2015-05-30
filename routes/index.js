var express = require('express');
var router = express.Router();
var flash = require('connect-flash');
var mongoose = require( 'mongoose' );
var users = mongoose.model( 'users', users );
/* GET home page. */
router.get('/', function(req, res, next) {
	if(req.user){
		if(req.user.campaigns.length>0){
			return res.render('dashboard');
		}
		return res.render('profile');
	}
  return res.render('sign_in',{
    message: req.flash('error')
  });

});
router.get('/welcome', function(req, res, next) {
  res.render('welcome');
});

module.exports = router;
