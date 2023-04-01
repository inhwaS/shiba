$(function() {
	
  // Get references to the input and button elements
  var $button = $('#send-button');
  var $messages = $('.messages');

  // Get references to the file input element and form
  var $fileInput = $('#file-input');
  var $form = $('#file-form');
  var $messages = $('#messages');
  var $fileName = $("#file-name");

  addMessage('Shiba', 'Welcome to VRIV. How may I assist you today?', 'received');
  $fileName.hide();

  // Show file name and upload button when a file is selected
  $('#file-input').on('change', function() {
    var fileName = $(this).val().split('\\').pop();
    $fileName.show();
    $fileName.val(fileName);
    
  });

  // Add a click event listener to the button
  $button.on('click', function() {
  	event.preventDefault();
    // Get the user's message from the input element
    var file = $fileInput[0].files[0];
    // Add the user's message to the chat window
	addMessage('You', file.name, 'sent', function(){
		$form.hide();
		addMessage('Shiba', 'Successfully uploaded! please wait to be parsed', 'received');
	});
  });

 
	$('#video-button').click(function() {
		event.preventDefault();
		console.log("video button sending!!");
		$.ajax({
		    url: '/api/',
		    method: 'POST',
		    data: {
		        // your POST data here
		    },
		    success: function(response) {
		        // handle success response
		    },
		    error: function(error) {
		        // handle error response
		    }
		});
  });

  

  // Function for adding a message to the chat window
  function addMessage(sender, content, type, callback) {
	// Create a new message element
	console.log(content);
	var $message = $('<div>').addClass('message');
	var $sender = $('<div>').addClass('sender').text(sender + ':');
	var $content = $('<div>').addClass('content').addClass(type);

	if ( sender == 'Shiba') {
		// Add the message content one character at a time
		var index = 0;
		var messageInterval = setInterval(function() {
			if (index >= content.length) {
			  clearInterval(messageInterval);
			} else {
			  $content.text($content.text() + content.charAt(index));
			  index++;
			}
		}, 50);
	}else{
		$content.text(content);
	}

	$message.append($sender).append($content);
	$messages.append($message);
	$messages.scrollTop($messages[0].scrollHeight);

	if (callback) {
		callback();
	}
   }


});


