(function () {
  var donateBtn = LB('p');
  donateBtn.addEventListener('confirm', function () {
    alert('Thank\'s for donating');
  });
  donateBtn.addEventListener('cancel', function () {
    alert('You little bitch...');
  });
})()
