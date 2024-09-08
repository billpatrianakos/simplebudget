//
$('#calculate').click(function(e) {
  e.preventDefault();
  var total = 0;
  $('input[name=expense]').each(function() {
    console.log('Total: ' + total);
    console.log('Value: ' + this.value);
    total += this.value;
  });
  console.log('Total is ' + total);
});
