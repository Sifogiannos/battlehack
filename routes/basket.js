var express = require('express');
var router = express.Router();
var flash = require('connect-flash');
var mongoose = require( 'mongoose' );
var users = mongoose.model( 'users', users );
var campaigns = mongoose.model( 'campaigns', campaigns );
var littlebit = require('../lb_modules/node/littlebit.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	return res.render('basket');
});
router.post('/', function(req, res, next) {
	if (req.body.amount != 0) {
		lb = new littlebit('d77be4bee522347882cb8224280440772845647f');
		lb.donate(req.body.amount);
		return res.json({status:"ok", message:"you have donated $" + req.body.amount});
	}
	return res.json({status:"ok"});
});
module.exports = router;
