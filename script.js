$(function() {
	// Get references to the input and button elements
	var $input = $('#message-input');
	var $button = $('#send-button');
	
	// Add a click event listener to the button
	$button.on('click', function() {
		// Get the user's message from the input element
		var message = $input
