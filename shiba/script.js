$(function () {

    // Get references to the input and button elements
    var $button = $('#send-button');
    var $messages = $('.messages');
    var $GenerateVideo = $('#generate-button');
    var $hiddenDiv = $('.hidden');

    var $upload = $('choose-input1');
    var $record = $('choose-input2');
    ;
    // Get references to the file input element and form
    var $fileInput = $('#file-input');
    var $form = $('#file-form');
    var $messages = $('#messages');
    var $fileName = $("#file-name");
    const $selects = $('select');
    var $selectedWords = $("#selected-words");

    // start of loading functions
    $hiddenDiv.hide();
    $('#buttons').hide();
    addMessage('Shiba', 'Welcome to VRIV. How may I assist you today?', 'received', showButtons);
    $fileName.hide();


    // Show file name and upload button when a file is selected
    $('#file-input').on('change', function () {
        var fileName = $(this).val().split('\\').pop();
        $fileName.show();
        $fileName.val(fileName);
    })

    //Add a click event listener to the button
    // $button.on('click', function () {
    //     event.preventDefault();
    //     // Get the user's message from the input element
    //     var file = $fileInput[0].files[0];
    //     // Add the user's message to the chat window
    //     addMessage('You', file.name, 'sent', function () {
    //         $form.hide();
    //         addMessage('Shiba', 'the knife was the most commonly used tool to sharpen the wooden writing instrument known as the pencil which historians believe was invented in the 15th or 16th century but whittling the Woodway to eventually produce a point was a time-consuming tedious and inexact process as pencils became more ubiquitous in everyday life it became apparent that a faster', 'received');
    //         // const analyzeButton = document.createElement("button");
    //         // analyzeButton.textContent = "Analyze";
    //         //
    //         // // append the button to the document body
    //         // document.body.appendChild(analyzeButton);
    //         // document.getElementById("input").value = 'the knife was the most commonly used tool to sharpen the wooden writing instrument known as the pencil which historians believe was invented in the 15th or 16th century but whittling the Woodway to eventually produce a point was a time-consuming tedious and inexact process as pencils became more ubiquitous in everyday life it became apparent that a faster';
    //         // // add a click event listener to the button
    //         // analyzeButton.addEventListener("click", analyze);
    //     });
    // });

    $GenerateVideo.on('click', function () {
        event.preventDefault();
        console.log("hihihi")
        // Get the user's message from the input element
        console.log("my result pass in is " + $selectedWords.val());
        // Add the user's message to the chat window
        addMessage('You', $selectedWords.val(), 'sent', function () {
            $form.hide();
            addMessage('Shiba', 'Generate Video on ' + $selectedWords.val(), 'received');
        });
    });

    $('#video-button').click(function() {
        event.preventDefault();
        console.log("video button sending!!");
        $.ajax({
            url: '/api',
            method: 'POST',
            data: {
                // your POST data here
            },
            success: function(response) {
                // handle success response
                successCallback(response);
            },
            error: function(error) {
                // handle error response
            }
        });
    });

    function successCallback(response){
        console.log("successfully called function!");
//        console.log(response);
        var parsedResponse = $.parseJSON(response);
        console.log(parsedResponse.content);
        addMessage('Shiba', parsedResponse.content, 'received');
    }

    $upload.on('click', function () {
        const fileInput = document.getElementById("file-input");
        const selectedFile = fileInput.files[0];

        if (selectedFile) {
            const filePath = "path/to/intellij/" + selectedFile.name;
            console.log("File path:", filePath);

            // create a new XMLHttpRequest object
            const xhr = new XMLHttpRequest();

            // set up a POST request to the server
            xhr.open("POST", "/upload", true);

            // create a new FormData object to store the selected file
            const formData = new FormData();
            formData.append("file", selectedFile, selectedFile.name);

            // send the form data to the server
            xhr.send(formData);

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        console.log("File uploaded successfully");
                    } else {
                        console.log("Error uploading file");
                    }
                }
            };
        } else {
            console.log("No file selected");
        }
    })

    function showButtons() {
        setTimeout(function () {
            $('#buttons').show();
        }, 2000);
    }

    // Function for adding a message to the chat window
    function addMessage(sender, content, type, callback) {
        // Create a new message element
        console.log(content);
        var $message = $('<div>').addClass('message');
        var $sender = $('<div>').addClass('sender').text(sender + ':');
        var $content = $('<div>').addClass('content').addClass(type);

        if (sender == 'Shiba') {
            // Add the message content one character at a time
            var index = 0;
            var messageInterval = setInterval(function () {
                if (index >= content.length) {
                    clearInterval(messageInterval);
                } else {
                    $content.text($content.text() + content.charAt(index));
                    index++;
                }
            }, 50);
        } else {
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


