var express = require('express');
var router = express.Router();

//database
var mongoose = require( 'mongoose' );
var users  = mongoose.model( 'users', users );
var campaigns = mongoose.model( 'campaigns', campaigns );

router.post('/', function(req, res){
  var key = req.body.api_key;
  console.log('key', key)
  var amount = req.body.amount;
  users.findOne({key:key}, function(err, user){
  	if(err){
  		return res.json({status:"error", message:"server error"});
  	}
  	if(!user){
  		return res.json({status:"error", message:"No authorized key"});
  	}

  	campaigns.findOne({isActive:true}, function(err, campaign){
  		//update user if the campaign is already exists
  		var activity = {title:"A user donated " + amount + " $ through your website.", when: Date.now()};
  		users.findOneAndUpdate({_id:user._id}, {$push:{activity:activity}}, function(err){});
  		users.findOneAndUpdate({_id:user._id, campaigns:{$ne:campaign._id}}, {$push:{campaigns:campaign._id}}, function(err){});
  		//update campaign
  		var participant_iterator;
  		for(var i = 0; i<campaign.participants.length; i++){
  			if(campaign.participants[i].user_id.equals(user._id)){
  				participant_iterator=i;
  			}
  		}
  		//push to campaign new participant
  		if(participant_iterator == undefined){
  			var newParticipant = {
  				user_id					: user._id,
  				remainingAmount	: amount,
  				paidAmount			: 0,
  				total						: amount
  			};
  			campaigns.findOneAndUpdate({_id:campaign._id}, {$push:{participants:newParticipant}}, function(err, campaign){
  				if(err){
			  		return res.json({status:"error", message:"server error"});
			  	}
			  	if(!campaign){
			  		return res.json({status:"error", message:"No campaign found"});
			  	}
			  	return res.json({status:"ok", message:"you have added " + amount + " $ to campaign"});
  			});
  		}else{
  			var newProperties = {
  				"participants.$.remainingAmount"	: amount,
  				"participants.$.total"						: amount
  			};
  			campaigns.findOneAndUpdate({_id:campaign._id, "participants.user_id":user._id}, {$inc:newProperties}, function(err, campaign){
  				if(err){
			  		return res.json({status:"error", message:"server error"});
			  	}
			  	if(!campaign){
			  		return res.json({status:"error", message:"No campaign found"});
			  	}
			  	return res.json({status:"ok", message:"you have added "+amount+" to campaign"});
  			});
  		}
  	});
  });
});

module.exports = router;
