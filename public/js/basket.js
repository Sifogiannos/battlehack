var donate = LB('.controls');
var price = document.querySelector('#price');
var willDonate = false;
donate.addEventListener('confirm', function () {
  willDonate = true;
  price.textContent = 301;
});
donate.addEventListener('cancel', function () {
  willDonate = false;
  price.textContent = 300;
});
var checkout = document.querySelector('.button-primary');
checkout.addEventListener('click', function () {
  $.ajax({
    url: '/basket',
    type: 'POST',
    data: {
      amount: willDonate ? 1 : 0,
    },
  })
});
