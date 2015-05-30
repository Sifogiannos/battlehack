// Mongoose import
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var users = new Schema({
	name				: String,
	surname 		: String, 
	email				: String,
	password		: String,
	company 		: String,
	key					: String,
	websiteURL 	: String,
	imgPath 		: String,
	campaigns		: [{ type: Schema.Types.ObjectId, ref: 'campaigns' }]
	activity : [{
		_id 		: false
		title 	: String,
		when  	: Date
	}]
});

var campaigns = new Schema({
	title					: String,
	description		: String,
	participants	: [{
		user_id					: { type: Schema.Types.ObjectId, ref: 'users' },
		remainingAmount	: Number,
		paidAmount			: Number,
		total 					: Number
	}],
	finalDate			: Date,
	campaignCover	: String,
	charity:{
		logo 			: String,
		name 			: String,
		contact 	: String,
	}
	fundingGoal 	: Number,
	funds					: Number,
	subscribers 	: [String],
	isActive			: { type: Boolean, default: true } 
});


mongoose.model( 'users', users );

mongoose.model( 'campaigns', campaigns );

mongoose.connect( 'mongodb://localhost/test' );