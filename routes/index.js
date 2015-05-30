var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/welcome', function(req, res, next) {
  res.render('welcome');
});

router.get('/dashboard', function(req, res, next) {
  res.render('dashboard');
});
module.exports = router;
