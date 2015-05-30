var passport = require('passport');
var flash = require('connect-flash');
var LocalStrategy = require('passport-local').Strategy;
require('../pass.js')(passport, LocalStrategy);
var crypto    = require('crypto');
var key       = 'secret';
var algorithm = 'sha1';
var hash, hmac;
var mongoose = require( 'mongoose' );
var users = mongoose.model( 'users', users );


exports.login = function(req, res){
  if(req.user)
    return res.redirect('/');
  //if not logged in sign in
  res.render('sign_in',{
    message: req.flash('error')
  });
};

exports.signup = function(req, res){
  if(req.user)
    return res.redirect('/');
  return res.render('sign_up');
};

exports.logout = function(req, res){
  if(req.user){
    req.logout();
    //after logout what to do
    return res.redirect('/login');
  }
  return res.redirect({status:"error", message:"you are not logged in to logout"});
}

exports.createUser = function(req, res){
  
  //create password hash
  hash = generateHash(req.body.password);

  var mail = req.body.username.toLowerCase();
  var user = new users({
    email        : mail,
    password      : hash
  });
  users.findOne({email:mail}).exec(function(err, user_exists){
    if(err) 
    	return res.json({status:"error", message:"error occured"});
    if(user_exists)
      return res.json({status:"error", message:"the user already exists"});
    if(!user_exists){
      user.save( function(err, user){
        if(err) 
        	return res.json({status:"error", message:"could not save new user"});
        req.logIn(user, function(err) {
          if (err) 
          	return res.json({status:"error", message:"error occured"});

          //generate user api key
          user.toObject();
          hash = generateHash(user._id.toString());
          users.findOneAndUpdate({_id:user._id}, {$set:{key:hash, tokenLastActive:Date.now()}}, function(err){});

      		return res.redirect('/');
        });
      });
    }
  });
};

function generateHash(text){
  hmac = crypto.createHmac(algorithm, key);
  // change to 'binary' if you want a binary digest
  hmac.setEncoding('hex');
  // write in the text that you want the hmac digest for
  hmac.write(text);
  // you cannot read from the stream until you call end()
  hmac.end();
  return  hmac.read();
}