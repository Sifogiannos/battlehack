var express = require('express');
var router = express.Router();
var flash = require('connect-flash');
var mongoose = require( 'mongoose' );
var users = mongoose.model( 'users', users );
var campaigns = mongoose.model( 'campaigns', campaigns );

/* GET home page. */
router.get('/', function(req, res, next) {
	if(req.user){
		if(req.user.campaigns.length>0){
			return res.render('dashboard');
		}
		campaigns.findOne({isActive:true}, function(err, campaign){
			if(!campaign){
				return res.json({status:"error", message:"No campaign active"});
			}
			return res.render('profile',{
				step        : 2,
	      key         : null,
	      campaignId  : campaign._id,
	      widget      : "code"
			});
		});
	}else{
		return res.render('sign_in',{
	    message: req.flash('error')
	  });
	}

});
router.get('/welcome', function(req, res, next) {
  res.render('welcome');
});

module.exports = router;
