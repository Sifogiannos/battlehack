var crypto    = require('crypto');
var key       = 'secret';
var algorithm = 'sha1';
var hash, hmac;

var mongoose = require( 'mongoose' );
var users = mongoose.model( 'users', users );

module.exports = function(passport, LocalStrategy){

  function findById(id, fn) {
    users.findOne({ _id : id},function(err,user){
    	if(err)
    		return fn(err);
    	if(user)
    		return fn(null,user);
    	return fn(new Error('User ' + id + ' does not exist'));
    });
  }

  function findByUsername(username, fn) {
    users.findOne({email : username.toLowerCase()},function(err,user){
      if(err) 
      	return fn(err);
      if(user)
        return fn(null,user);
      return fn(null,null);
    });
  }

  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    findById(id, function (err, user) {
      done(err, user);
    });
  });


  passport.use(new LocalStrategy(
    function(username, password, done) {
      // asynchronous verification, for effect...
      process.nextTick(function () {

        hmac = crypto.createHmac(algorithm, key);

  		  // change to 'binary' if you want a binary digest
  		  hmac.setEncoding('hex');

  		  // write in the text that you want the hmac digest for
  		  hmac.write(password);

  		  // you can't read from the stream until you call end()
  		  hmac.end();

  		  // read out hmac digest
  		  hash = hmac.read();
        // Find the user by username.  If there is no user with the given
        // username, or the password is not correct, set the user to `false` to
        // indicate failure and set a flash message.  Otherwise, return the
        // authenticated `user`.
        findByUsername(username, function(err, user) {
          if(err){
          	return done(err);
          }
          if(!user){ 
            console.log("no user");
            return done(null, false, { message: 'Username or Password were incorrect'});
          }
          if(user.password != hash){
            return done(null, false, { message: 'Username or Password were incorrect' });
          }
          return done(null, user);
        });
      });
    }
  ));
};