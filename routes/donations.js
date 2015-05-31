var express = require('express');
var router = express.Router();

//braintree intergration
var braintree = require('braintree');

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "32yqmqzm4jwqf269",
  publicKey: "rpmzdgnrt2nzx2b3",
  privateKey: "3507e86793b7bf1d5b35803558bed1a9"
});


//pusher intergration
var Pusher = require('pusher');

var pusher = new Pusher({
  appId: '122455',
  key: 'cd774e2b8a51f506bc9f',
  secret: 'c655051d34b700c1428d'
});


//database
var mongoose = require( 'mongoose' );
var users  = mongoose.model( 'users', users );
var campaigns = mongoose.model( 'campaigns', campaigns );

router.post('/', function(req, res){

  var key = req.body.api_key;
  var amount = req.body.amount;

  users.findOne({key:key}, function(err, user){
  	if(err){
  		return res.json({status:"error", message:"server error"});
  	}
  	if(!user){
  		return res.json({status:"error", message:"No authorized key"});
  	}

  	campaigns.findOne({isActive:true}, function(err, campaign){

  		if(!campaign){
  			return res.json({status:"error", message:"No campaign active"});
  		}
  		
  		//update campaign
  		var participant_iterator;
  		var nonce;
  		for(var i = 0; i<campaign.participants.length; i++){
  			if(campaign.participants[i].user_id.equals(user._id)){
  				participant_iterator=i;
  				nonce = campaign.participants[i].nonce;
  			}
  		}

  		//push to campaign new participant
  		if(participant_iterator == undefined){
  			return res.json({status:"error", message:"No campaign found"});
  		}else{
			  // Use payment method nonce here
        //return res.end();
			  gateway.transaction.sale({
			    amount: amount,
			    paymentMethodNonce: 'fake-valid-nonce'
			  }, function (err, result){
          console.log(err);
			    if(err){
			      return res.json(err);
			    }

			    //if transaction success
			    if(result.success){
            amount = parseInt(amount);
		  			campaigns.findOneAndUpdate({_id:campaign._id, "participants.user_id":user._id}, {$inc:{"participants.$.total"	: amount, "participants.$.paidAmount"	: amount, funds:amount}}, function(err, campaign){
              
		  				if(err){
					  		return res.json({status:"error", message:"server error"});
					  	}
					  	if(!campaign){
					  		return res.json({status:"error", message:"No campaign found"});
					  	}
					  	//update user if the campaign is already exists
				  		var activity = {title:"A user donated " + amount + " $ through your website.", when: Date.now()};

              //Send data to dashboard

              var populate = {path: 'campaigns', match: {isActive: true}};
				  		users.findOneAndUpdate({_id:user._id}, {$push:{activity:activity},$set:{tokenLastActive:Date.now()}},{new:true}).populate(populate).lean().exec(function(err,user){
					  	
              var user = transformDashboardData(user);
					  	pusher.trigger('dashboard', 'refresh',user);
							});
							return res.json({status:"ok", message:"you have been charged for $" + amount});
		  			});

  				}
          else{
            console.log(result);
          }
			  });
  		}
  	});
  });
});

module.exports = router;

function transformDashboardData(user){
  var remainingAmount = 0;
  var paidAmount = 0;
  var campaign = {};
  //find the remainig amount to pay for the active campaign 
  if(user.campaigns.length > 0){
    for(var i = 0; i<user.campaigns[0].participants.length; i++){
      if(user.campaigns[0].participants[i].user_id.equals(user._id)){
        remainingAmount = user.campaigns[0].participants[i].remainingAmount;
        paidAmount = user.campaigns[0].participants[i].paidAmount;
      }
    }
  }

  if(user.campaigns.length > 0){
    delete user.campaigns[0].participants;
    campaign =  user.campaigns[0];
  }

  delete user._id;
  delete user.password;
  delete user.campaigns;
  user.campaign = campaign;
  user.remainingAmount =  remainingAmount;
  user.paidAmount =  paidAmount;
  return user;
}