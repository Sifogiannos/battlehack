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
  ajax({
    url: '/checkout',
    type: 'POST',
    data: {
      donate: willDonate
    },
  })
});
function ajax (args) {
    var jqXHR = new XMLHttpRequest();
    jqXHR.onreadystatechange = function () {
        if (jqXHR.readyState == 4) {
            if (jqXHR.status == 200) {
                if (args.success instanceof Function){
                    args.success(jqXHR);
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
