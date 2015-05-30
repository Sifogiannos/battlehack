var express = require('express');
var router = express.Router();

//database
var mongoose = require( 'mongoose' );
var users  = mongoose.model( 'users', users );

/* GET users listing. */
router.get('/', function(req, res){
	if(req.user){

		var populate = {path: 'campaigns', match: {isActive: true}, select:'participants'};
		
		users.findOne({_id:req.user.id}).populate(populate).lean().exec(function(err, user){
			delete user._id;
			delete user.password;

			var amountToPay = 0;
			//find the remainig amount to pay for the active campaign 
			if(user.campaigns.length > 0){
				for(var i = 0; i<user.campaigns[0].participants.length; i++){
	  			if(user.campaigns[0].participants[i].user_id.equals(user._id)){
	  				amountToPay=user.campaigns[0].participants[i].remainingAmount;
	  			}
	  		}
			}

			delete user.campaigns;
			user.amount =  amountToPay;

			return res.json({status:"ok", data:user});
		});
	}else{
		return res.redirect('/login');
	}
});

router.put('/', function(req, res){
	if(req.user){
		var user = req.user;
		var bodyUser = req.body;
		user.name =  bodyUser.name || user.name;
		user.surname =  bodyUser.surname || user.surname;
		user.email =  bodyUser.email || user.email;
		user.company =  bodyUser.company || user.company;
		user.websiteURL =  bodyUser.websiteURL || user.websiteURL;
		user.imgPath =  bodyUser.imgPath || user.imgPath;

		user.save(function(err){
			if(err){
				return res.json({status:"error", message:"could not save user"});
			}
			return res.redirect('/users');
		});

	}else{
		return res.redirect('/login');
	}
});

module.exports = router;
