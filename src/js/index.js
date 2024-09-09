require('normalize.css/normalize.css');
require('../less/style.less');

// Global variables & requires
const _           = require('lodash');
let availableCash = 0;
let expenses      = [];
let total         = 0;

$('.available').hide();

// Set the total cash for budget. This should never change no matter how many times the calc runs
$('input[name=availableCash]').change(function(e) {
  availableCash = parseFloat($('input[name=availableCash]').val());

  // Persist the data between browser sessions
  localStorage.setItem("availableCash", availableCash);
  localStorage.setItem("restoreSession", true);
});

// Run the calculation on demand
$('#calculate').click(function(e) {
  e.preventDefault(); // Do not submit form

  expenses = []; // Reset the sum array

  $('input[name=expense]').each(function() {
    expenses.push(parseFloat(this.value));
  });

  // Output the total
  total = _.sum(expenses);
  $('#total').text(availableCash - total);
  $('.available').show();

  // Save data for next session
  localStorage.setItem("expenses", JSON.stringify(expenses));
});

// Add a new expense
$('#new-expense').click(function(e) {
  e.preventDefault(); // Do not submit form

  $('.additional-inputs').append('<input type="number" step=".01" name="expense" />');
});

// Clear/Reset storage
$('#reset').click(function(e) {
  e.preventDefault(); // Do not submit form

  localStorage.clear()
});

// Restore data from previous session if available
if (localStorage.getItem("restoreSession") !== null) {
  availableCash = localStorage.getItem("availableCash");
  expenses      = JSON.parse(localStorage.getItem("expenses"));

  $('input[name=availableCash]').val(availableCash);

  $('.available').show();

  // Show each expense input we have
  expenses.forEach(function(expense, i) {
    $('.additional-inputs').append('<input type="number" step=".01" name="expense" value="' +  expense + '" />');
  });
}
