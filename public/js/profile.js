(function(){

	var selectCampaign = document.getElementById('selectCampaign');
	var braintreeForm = document.getElementById('checkout');
	selectCampaign.addEventListener('click',loadBraintree);

	function loadBraintree(e){
		e.preventDefault();
		$.ajax({
			url: '/client_token'
		})
		.done(function(response) {
			var clientToken = response;
			braintree.setup(clientToken, "dropin", {
			  container: "payment-form",
			  singleUse: false
			});
			braintreeForm.className = '';
			selectCampaign.className +=' hide';
		});
	}
})();