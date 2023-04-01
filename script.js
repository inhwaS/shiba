$(function() {
	// Get references to the input and button elements
	var $input = $('#message-input');
	var $button = $('#send-button');
	var $messages = $('.messages');
	
	// Add a click event listener to the button
	$button.on('click', function() {
		// Get the user's message from the input element
		var message = $input.val().trim();

		// Clear the input field
		$input.val('');

		// Add the user's message to the chat window
		addMessage('You', message, 'sent');

		// Send the user's message to ChatGPT and wait for a response
		$.get('/api/chat', { message: message }, function(response) {
			// Add ChatGPT's response to the chat window
			addMessage('ChatGPT', response, 'received');
		});
	});

	// Function for adding a message to the chat window
	function addMessage(sender, content, type) {
		// Create a new message element
		var $message = $('<div>').addClass('message');
		var $sender = $('<div>').addClass('sender').text(sender + ':');
		var $content = $('<div>').addClass('content').addClass(type).text(content);

		// Add the sender and content to the message element
		$message.append($sender).append($content);

		// Add the message element to the chat window
		$messages.append($message);

		// Scroll to the bottom of the chat window
		$messages.scrollTop($messages[0].scrollHeight);
	}
});
