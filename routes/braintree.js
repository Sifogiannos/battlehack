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
  gateway.clientToken.generate({
    customerId: req.user.id
  }, function (err, response) {
    res.json(response.clientToken);
  });
};

exports.purchases = function(req, res){

  var nonce = req.body.payment_method_nonce;
  // Use payment method nonce here
  gateway.transaction.sale({
    amount: '10.00',
    paymentMethodNonce: 'nonce-from-the-client',
  }, function (err, result){
    if(err)
      return res.json({status:"error", message:"could not do the transaction"});
    return res.json(result);
  });
};