function lQ (selector) {
	return document.querySelector(selector);
}
function Element (args) {
	var el = document.createElement(args.tag);
	el.textContent = args.text || "";
	el.className = args.class || "";
	return el;
}
var ajax = function (args) {

    var jqXHR = new XMLHttpRequest();

    jqXHR.onreadystatechange = function () {

        if (jqXHR.readyState == 4) {
            if (jqXHR.status == 200) {
                if (args.success instanceof Function){
                    args.success(jqXHR,jqXHR.response);
                }
            }
            else {
                if (args.error instanceof Function){
                    args.error(jqXHR);
                }
            }
            if (args.complete instanceof Function) {
                args.complete(jqXHR);
            }
        }
    }

    jqXHR.open(args.type, args.url, true);

    if (args.type == 'POST')
        jqXHR.setRequestHeader('Content-type',
            'application/x-www-form-urlencoded');

    jqXHR.send(JSON.stringify(args.data));
};
(function(){

	var payButton = document.getElementById('payButton');
	var braintreeEl = document.getElementById('braintree');
	var paymentContainer = document.getElementById('paymentContainer');
	var paymentForm = document.getElementById('checkout');
	var widget = paymentContainer.parentNode;

	// Populate dashboard data from server
	ajax({
		url: '/users',
		type:'GET',
	 	success: function (err,response) {
	 		var response = JSON.parse(response);
			loadCardData(response.data);
		}
	});

	// var user = {
	// 	name				: 'Cristiano',
	// 	surname 		: 'Betta',
	// 	email				: 'professor@x.com',
	// 	company 		: 'PayPal',
	// 	key					: '1234',
	// 	tokenLastActive : new Date(),
	// 	websiteURL 	: 'http://cristianobetta.com',
	// 	imgPath 		: 'https://avatars1.githubusercontent.com/u/7718?v=3&s=400',
	// 	activity : [{
	// 		_id 		: 0,
	// 		title 	: 'yolo',
	// 		when  	: new Date()
	// 	},{
	// 		_id 		: 0,
	// 		title 	: 'yolo',
	// 		when  	: new Date()
	// 	},{
	// 		_id 		: 0,
	// 		title 	: 'yolo',
	// 		when  	: new Date()
	// 	}],
	// 	remainingAmount: 100,
	// 	paidAmount: 10000,
	// 	campaign: 	{
	// 			title					: 'Grow Hair Like U Just Don\'t Care',
	// 			description		: 'Plz?',
	// 			finalDate			: new Date('6/9/2015'),
	// 			campaignCover	: '',
	// 			charity:{
	// 				logo 			: 'https://avatars1.githubusercontent.com/u/7718?v=3&s=400',
	// 				name 			: 'Make A Wish',
	// 				contact 	: '090-0000000000',
	// 			},
	// 			fundingGoal 	: 3000,
	// 			funds					: 2500,
	// 			subscribers 	: [{}],
	// 			isActive			: {type: true, default: true }
	// 		}
	// }

	function loadCardData(user){
		console.log(user);
		var campaign = user.campaign;
		lQ('.card-logo img').src = campaign.charity.logo;
		var url = campaign.campaignCover;
		var bImg = 'linear-gradient(rgba(95,173,255, 0.6), rgba(95,173,255, 0.6)), url(' + url + ')';
		lQ('.cover').style['background-image'] = bImg;
		lQ('.card-title').textContent = campaign.title;
		lQ('.card-user').textContent = 'By ' + campaign.charity.name;
		lQ('.days-remaining h2').textContent = moment(campaign.finalDate).diff(Date.now(), 'days');
		lQ('.funds-remaining span').textContent = '$ ' + (campaign.fundingGoal - campaign.funds);

		var apiIsActive = user.tokenLastActive !== undefined &&
			moment(new Date()).diff(new Date(user.tokenLastActive), 'weeks') < 2;
		lQ('.api-status span').textContent = apiIsActive ? 'connected' : 'inactive';
		lQ('.notification-text .amount').textContent = '$ ' + user.paidAmount;
		lQ('.notification-text .charity').textContent = campaign.charity.name;
		lQ('.api-status span').className = 'right ' + (apiIsActive ? 'green-color' : 'red-color');
		lQ('.backers span').textContent = user.activity.length;
		lQ('.funds-raised span').textContent = '$ ' + user.paidAmount;

		// Activity shit
		var ul = lQ('.activity-list');
		user.activity.forEach(function (item) {
			var li = Element({
				tag: 'li',
				text: 'A user donated $1 through your website'
			});
			ul.appendChild(li);
		});
	}

})();

var clientToken = "eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiI3MDVmZDUwZjUwODg5OGQzMTFlMjMyYTI1OTEzNWFhN2U4ZDdmNWY5ODYwMzA2YTEzMjYyZmUwMzRiZTZmZGIxfGNyZWF0ZWRfYXQ9MjAxNS0wNS0zMFQxMzoyOTozNi42MTg3MTczOTArMDAwMFx1MDAyNm1lcmNoYW50X2lkPWRjcHNweTJicndkanIzcW5cdTAwMjZwdWJsaWNfa2V5PTl3d3J6cWszdnIzdDRuYzgiLCJjb25maWdVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvZGNwc3B5MmJyd2RqcjNxbi9jbGllbnRfYXBpL3YxL2NvbmZpZ3VyYXRpb24iLCJjaGFsbGVuZ2VzIjpbXSwiZW52aXJvbm1lbnQiOiJzYW5kYm94IiwiY2xpZW50QXBpVXJsIjoiaHR0cHM6Ly9hcGkuc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbTo0NDMvbWVyY2hhbnRzL2RjcHNweTJicndkanIzcW4vY2xpZW50X2FwaSIsImFzc2V0c1VybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXV0aFVybCI6Imh0dHBzOi8vYXV0aC52ZW5tby5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIiwiYW5hbHl0aWNzIjp7InVybCI6Imh0dHBzOi8vY2xpZW50LWFuYWx5dGljcy5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIn0sInRocmVlRFNlY3VyZUVuYWJsZWQiOnRydWUsInRocmVlRFNlY3VyZSI6eyJsb29rdXBVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvZGNwc3B5MmJyd2RqcjNxbi90aHJlZV9kX3NlY3VyZS9sb29rdXAifSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImRpc3BsYXlOYW1lIjoiQWNtZSBXaWRnZXRzLCBMdGQuIChTYW5kYm94KSIsImNsaWVudElkIjpudWxsLCJwcml2YWN5VXJsIjoiaHR0cDovL2V4YW1wbGUuY29tL3BwIiwidXNlckFncmVlbWVudFVybCI6Imh0dHA6Ly9leGFtcGxlLmNvbS90b3MiLCJiYXNlVXJsIjoiaHR0cHM6Ly9hc3NldHMuYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhc3NldHNVcmwiOiJodHRwczovL2NoZWNrb3V0LnBheXBhbC5jb20iLCJkaXJlY3RCYXNlVXJsIjpudWxsLCJhbGxvd0h0dHAiOnRydWUsImVudmlyb25tZW50Tm9OZXR3b3JrIjp0cnVlLCJlbnZpcm9ubWVudCI6Im9mZmxpbmUiLCJ1bnZldHRlZE1lcmNoYW50IjpmYWxzZSwiYnJhaW50cmVlQ2xpZW50SWQiOiJtYXN0ZXJjbGllbnQzIiwibWVyY2hhbnRBY2NvdW50SWQiOiJzdGNoMm5mZGZ3c3p5dHc1IiwiY3VycmVuY3lJc29Db2RlIjoiVVNEIn0sImNvaW5iYXNlRW5hYmxlZCI6dHJ1ZSwiY29pbmJhc2UiOnsiY2xpZW50SWQiOiIxMWQyNzIyOWJhNThiNTZkN2UzYzAxYTA1MjdmNGQ1YjQ0NmQ0ZjY4NDgxN2NiNjIzZDI1NWI1NzNhZGRjNTliIiwibWVyY2hhbnRBY2NvdW50IjoiY29pbmJhc2UtZGV2ZWxvcG1lbnQtbWVyY2hhbnRAZ2V0YnJhaW50cmVlLmNvbSIsInNjb3BlcyI6ImF1dGhvcml6YXRpb25zOmJyYWludHJlZSB1c2VyIiwicmVkaXJlY3RVcmwiOiJodHRwczovL2Fzc2V0cy5icmFpbnRyZWVnYXRld2F5LmNvbS9jb2luYmFzZS9vYXV0aC9yZWRpcmVjdC1sYW5kaW5nLmh0bWwiLCJlbnZpcm9ubWVudCI6Im1vY2sifSwibWVyY2hhbnRJZCI6ImRjcHNweTJicndkanIzcW4iLCJ2ZW5tbyI6Im9mZmxpbmUiLCJhcHBsZVBheSI6eyJzdGF0dXMiOiJtb2NrIiwiY291bnRyeUNvZGUiOiJVUyIsImN1cnJlbmN5Q29kZSI6IlVTRCIsIm1lcmNoYW50SWRlbnRpZmllciI6Im1lcmNoYW50LmNvbS5icmFpbnRyZWVwYXltZW50cy5zYW5kYm94LkJyYWludHJlZS1EZW1vIiwic3VwcG9ydGVkTmV0d29ya3MiOlsidmlzYSIsIm1hc3RlcmNhcmQiLCJhbWV4Il19fQ==";
