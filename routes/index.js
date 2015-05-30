var express = require('express');
var router = express.Router();
var flash = require('connect-flash');
/* GET home page. */
router.get('/', function(req, res, next) {
	if(req.user){
		return res.render('dashboard');
	}
  return res.render('sign_in',{
    message: req.flash('error')
  });
});
router.get('/welcome', function(req, res, next) {
  res.render('welcome');
});

module.exports = router;
