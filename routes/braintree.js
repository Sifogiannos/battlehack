var mongoose = require( 'mongoose' );
var users = mongoose.model( 'users', users );
var campaigns = mongoose.model( 'campaigns', campaigns );
//braintree intergration
var braintree = require('braintree');

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "32yqmqzm4jwqf269",
  publicKey: "rpmzdgnrt2nzx2b3",
  privateKey: "3507e86793b7bf1d5b35803558bed1a9"
});


//braintree route handle functions
exports.client_token = function(req, res){
  gateway.clientToken.generate({
  }, function (err, response) {
    res.json(response.clientToken);
  });
};

exports.authorize = function(req, res){
  if(req.user){
    var nonce = req.body.payment_method_nonce;
    var campaignId = req.body.campaignId;
    var newParticipant = {
      user_id         : req.user._id,
      remainingAmount : 0,
      paidAmount      : 0,
      total           : 0,
      nonce           : nonce
    };
    campaigns.findOneAndUpdate({_id:campaignId}, {$push:{participants:newParticipant}}, function(err, campaign){
      users.findOneAndUpdate({_id:req.user._id, campaigns:{$ne:campaign._id}},{$push:{campaigns:campaign._id}},function(err, user){
        return res.render('profile', {
          step        : 3,
          key         : user.key,
          campaignId  : campaignId,
          widget      : "code"
        });
      });
    });
  }else{
    return res.redirect('/login');
  }
};