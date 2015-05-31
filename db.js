// Mongoose import
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var users = new Schema({
	name						: String,
	surname 				: String, 
	email						: String,
	password				: String,
	company 				: String,
	key							: String,
	tokenLastActive : Date,
	websiteURL 			: String,
	imgPath 				: String,
	campaigns				: [{ type: Schema.Types.ObjectId, ref: 'campaigns' }],
	activity : [{
		_id 		: false,
		title 	: String,
		when  	: Date
	}]
});

var campaigns = new Schema({
	title					: String,
	description		: String,
	participants	: [{
		_id							: false,
		user_id					: { type: Schema.Types.ObjectId, ref: 'users' },
		nonce 					: String, 
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
	},
	fundingGoal 	: Number,
	funds					: Number,
	isActive			: { type: Boolean, default: true } 
});
// var campaign = {
// 	title: "Help us bring food and clothes to orfans",
// 	description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
// 	finalDate : new Date('6/9/2015'),
// 	campaignCover:"/img/card-cover.jpg",
// 	charity: {
// 		logo:"/img/hamogelo.png",
// 		name:"Hamogelo tou paidiou"
// 	},
// 	fundingGoal:10000,
// 	funds:7250,
// 	isActive:true
// }

mongoose.model( 'users', users );

mongoose.model( 'campaigns', campaigns );

mongoose.connect( 'mongodb://localhost/test' );