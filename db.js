// Mongoose import
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var users = new Schema({
	email				: String,
	password		: String,
	company 		: String,
	token				: String,
	campaings		: [{ type: Schema.Types.ObjectId, ref: 'campaigns' }]
});

var campaigns = new Schema({
	title					: String,
	description		: String,
	participants	: [{
		user_id					: { type: Schema.Types.ObjectId, ref: 'users' },
		remainingAmount	: Number,
		paidAmount			: Number
	}],
	fundingGoal 	: Number,
	funds					: Number,
	subscribers 	: [String]
});


mongoose.model( 'users', users );

mongoose.model( 'campaigns', campaigns );

mongoose.connect( 'mongodb://localhost/test' );