var mongoose = require( 'mongoose' );

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
  var string = req.user.id.toString();
  gateway.clientToken.generate({
    customerId: string
  }, function (err, response) {
    console.log(response);
    res.json(response.clientToken);

  });
};

exports.authorize = function(req, res){

  var nonce =req.body.payment_method_nonce;
  var campaignId = req.body.campaignId;
  // campaigns.findOneAndUpdate({_id:campaignId},{$push:{participants}},function(err,campaign){
  //   users.findOneAndUpdate({_id:req.user._id},{$push:{campaigns:campaign._id}},function(err,user){

  //   });
  // });
  return res.redirect('/'); 
};
  // var amount = "10.00"; //req.body.amount;
  // // Use payment method nonce here
  // gateway.transaction.sale({
  //   amount: amount,
  //   paymentMethodNonce: nonce,
  // }, function (err, result){
  //   if(err){
  //     return res.json(err);
  //   }
  //   if(result.success){
  //     return res.json({status:"ok", message:"you have been charged for" + amount});
  //   }
  // });