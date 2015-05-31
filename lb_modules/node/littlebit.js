var querystring = require('querystring');
var http = require('http');

module.exports = function (api_key) {
  this.api_key = api_key;
  this.donate = function (amount) {
    var post_data = querystring.stringify({
      amount: amount,
      api_key: api_key,
    });
    var post_options = {
        host: 'localhost',
        port: '80',
        path: '/donations',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': post_data.length
        }
    };
    var post_req = http.request(post_options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('Response: ' + chunk);
        });
    });
    post_req.write(post_data);
    post_req.end();
  }
}
