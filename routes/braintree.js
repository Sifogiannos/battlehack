var mongoose = require( 'mongoose' );

//braintree intergration
var braintree = require('braintree');

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "32yqmqzm4jwqf269",
  publicKey: "rpmzdgnrt2nzx2b3",
  privateKey: "3507e86793b7bf1d5b35803558bed1a9"
});

var token = "eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiJiMTg0MDA0YmExN2E4YjM0MzNmZmVjNDkzYzE5NmNlZjRkMzM1NjZjMWEyZjA5NzcwMWFiZjQxZWJjNjcxMDM3fGNyZWF0ZWRfYXQ9MjAxNS0wNS0zMFQyMjo1NDo0OS4yMTc3MjczMDIrMDAwMFx1MDAyNmN1c3RvbWVyX2lkPTMyMTMwNTQxXHUwMDI2bWVyY2hhbnRfaWQ9MzJ5cW1xem00andxZjI2OVx1MDAyNnB1YmxpY19rZXk9cnBtemRnbnJ0Mm56eDJiMyIsImNvbmZpZ1VybCI6Imh0dHBzOi8vYXBpLnNhbmRib3guYnJhaW50cmVlZ2F0ZXdheS5jb206NDQzL21lcmNoYW50cy8zMnlxbXF6bTRqd3FmMjY5L2NsaWVudF9hcGkvdjEvY29uZmlndXJhdGlvbiIsImNoYWxsZW5nZXMiOltdLCJlbnZpcm9ubWVudCI6InNhbmRib3giLCJjbGllbnRBcGlVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvMzJ5cW1xem00andxZjI2OS9jbGllbnRfYXBpIiwiYXNzZXRzVXJsIjoiaHR0cHM6Ly9hc3NldHMuYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhdXRoVXJsIjoiaHR0cHM6Ly9hdXRoLnZlbm1vLnNhbmRib3guYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhbmFseXRpY3MiOnsidXJsIjoiaHR0cHM6Ly9jbGllbnQtYW5hbHl0aWNzLnNhbmRib3guYnJhaW50cmVlZ2F0ZXdheS5jb20ifSwidGhyZWVEU2VjdXJlRW5hYmxlZCI6dHJ1ZSwidGhyZWVEU2VjdXJlIjp7Imxvb2t1cFVybCI6Imh0dHBzOi8vYXBpLnNhbmRib3guYnJhaW50cmVlZ2F0ZXdheS5jb206NDQzL21lcmNoYW50cy8zMnlxbXF6bTRqd3FmMjY5L3RocmVlX2Rfc2VjdXJlL2xvb2t1cCJ9LCJwYXlwYWxFbmFibGVkIjp0cnVlLCJwYXlwYWwiOnsiZGlzcGxheU5hbWUiOiJJbmRldmlkdWFsIiwiY2xpZW50SWQiOm51bGwsInByaXZhY3lVcmwiOiJodHRwOi8vZXhhbXBsZS5jb20vcHAiLCJ1c2VyQWdyZWVtZW50VXJsIjoiaHR0cDovL2V4YW1wbGUuY29tL3RvcyIsImJhc2VVcmwiOiJodHRwczovL2Fzc2V0cy5icmFpbnRyZWVnYXRld2F5LmNvbSIsImFzc2V0c1VybCI6Imh0dHBzOi8vY2hlY2tvdXQucGF5cGFsLmNvbSIsImRpcmVjdEJhc2VVcmwiOm51bGwsImFsbG93SHR0cCI6dHJ1ZSwiZW52aXJvbm1lbnROb05ldHdvcmsiOnRydWUsImVudmlyb25tZW50Ijoib2ZmbGluZSIsInVudmV0dGVkTWVyY2hhbnQiOmZhbHNlLCJicmFpbnRyZWVDbGllbnRJZCI6Im1hc3RlcmNsaWVudDMiLCJtZXJjaGFudEFjY291bnRJZCI6Im1ucmJjaHJ0NWhzODgzMnciLCJjdXJyZW5jeUlzb0NvZGUiOiJVU0QifSwiY29pbmJhc2VFbmFibGVkIjpmYWxzZSwibWVyY2hhbnRJZCI6IjMyeXFtcXptNGp3cWYyNjkiLCJ2ZW5tbyI6Im9mZiJ9";


//braintree route handle functions
exports.client_token = function(req, res){
  gateway.clientToken.generate({
    customerId: 32130541
  }, function (err, response) {
    console.log(response);
    res.json(response.clientToken);

  });
};

exports.purchases = function(req, res){

  var nonce = token;//req.body.payment_method_nonce;
  var amount = "10.00"; //req.body.amount;
  // Use payment method nonce here
  gateway.transaction.sale({
    amount: amount,
    paymentMethodNonce: nonce,
  }, function (err, result){
    if(err){
      return res.json(err);
    }
    if(result.success){
    	return res.json({status:"ok", message:"you have been charged for" + amount});
    }
  });
};