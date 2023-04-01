$(function() {
	// Get references to the input and button elements
	var $input = $('#message-input');
	var $button = $('#send-button');
	var $messages = $('.messages');
	var $fileInput = $('#file-input');
	var $uploadButton = $('#upload-button');
	
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

	// Add a click event listener to the upload button
	$uploadButton.on('click', function() {
		// Get the file object from the file input element
		var file = $fileInput[0].files[0];

		// Create a new FormData object and add the file to it
		var formData = new FormData();
		formData.append('file', file);

		// Send the file to the server using a POST request
		$.ajax({
			url: '/api/upload',
			type: 'POST',
			data: formData,
			processData: false,
			contentType: false,
			success: function(response) {
				// Add the server's response to the chat window
				addMessage('You', 'uploaded file: ' + file.name, 'sent');
				addMessage('Server', response, 'received');
			},
			error: function() {
				// Display an error message if the file upload fails
				addMessage('Server', 'File upload failed.', 'received');
			}
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
