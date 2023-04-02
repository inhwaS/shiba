$(function () {

    // Get references to the input and button elements
    var $button = $('#send-button');
    var $messages = $('.messages');
    var $GenerateVideo = $('#generate-button');
    var $hiddenDiv = $('.hidden');
    var $video = $('#video');

    var $upload = $('choose-input1');
    var $record = $('choose-input2');

    // Get references to the file input element and form
    var $fileInput = $('#file-input');
    var $form = $('#file-form');
    var $messages = $('#messages');
    var $fileName = $("#file-name");
    var $textarea = $("#input");
    const $selects = $('select');
    var $selectedWords = $("#selected-words");
    var $analyzeGenerate = $('#analyze-generate')


    // start of loading functions
    $hiddenDiv.hide();
    $('#buttons').hide();
    addMessage('AudiosensAI', 'Welcome to AudiosensAI. How may I assist you today?', 'received', showButtons);
    $fileName.hide();
    $textarea.hide();
    $video.hide();
    $analyzeGenerate.hide();


    // Show file name and upload button when a file is selected
    $('#file-input').on('change', function () {
        var fileName = $(this).val().split('\\').pop();
        $fileName.show();
        $fileName.val(fileName);
    })

    $GenerateVideo.on('click', function () {
        event.preventDefault();

        let passToJquery = "";
        for (let i = 0; i < selectedDivs.length; i++) {
            passToJquery += $(selectedDivs[i]).text();
            passToJquery += " ";
        }
        const result = passToJquery.replace(/:\s*\d+/g, '');
        $("#selected-words").val(result);
        selectedWords = result;

        addMessage('You', 'Important keywords :: ' + $selectedWords.val(), 'sent');

        addMessage('AudiosensAI', 'Let me load the video!' , 'received', function(){
            $('#buttons').hide();
            $form.hide();
            $.ajax({
                url: '/media',
                method: 'POST',
                data: {
                    // your POST data here
                },
                success: function(response) {
                    // handle success response
                    $video.show();
                },
                error: function(error) {
                    // handle error response
                },
                complete: function() {
                    $('#loading-spinner').hide(); // hide the loading spinner
                }
            });
        });
    });

    $('#send-button').click(function() {
        event.preventDefault();
        var file = $fileInput[0].files[0];
        // Add the user's message to the chat window
        addMessage('You', file.name, 'sent', function(){
            $('#file-upload-section').hide();
            addMessage('AudiosensAI', 'Successfully uploaded! Please wait to be parsed', 'received', function(){
                $('#loading-spinner').show(); // show the loading spinner
            });
        });


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
            },
            complete: function() {
                $('#loading-spinner').hide(); // hide the loading spinner
            }
        });
    });

    function successCallback(response){
        var parsedResponse = $.parseJSON(response);

        addMessage('AudiosensAI', "Successfully parsed! Please select important keywords", 'received');
        $textarea.val(parsedResponse.content);

        $textarea.show();
        $analyzeGenerate.show();
        const rawText = $textarea.val().toLowerCase();
        const cleanText = rawText.replace(/[^a-z\s]/g, '');
        const words = cleanText.match(/\b\S+\b/g);
        const frequencyMap = new Map();
        words.forEach(word => {
            const count = frequencyMap.get(word) || 0;
            frequencyMap.set(word, count + 1);
        });
        const sortedWords = Array.from(frequencyMap.entries())
            .sort((a, b) => b[1] - a[1]);
        $('#output').html("");

        sortedWords.forEach(pair => {
            const word = pair[0];
            const count = pair[1];
            const div = $("<div>").text(`${word}: ${count}`);
            div.on("click", () => {
                if (div.hasClass("selected")) {
                    div.removeClass("selected");
                    // remove the div from the selected divs array
                    const index = selectedDivs.indexOf(div);
                    if (index > -1) {
                        selectedDivs.splice(index, 1);
                    }
                } else {
                    div.addClass("selected");
                    // add the div to the selected divs array
                    selectedDivs.push(div);
                }
            });
            $('#output').append(div);
        });
    }

    function showButtons() {
        setTimeout(function () {
            $('#buttons').show();
        }, 2000);
    }

    // Function for adding a message to the chat window
    function addMessage(sender, content, type, callback) {
        // Create a new message element
        var $message = $('<div>').addClass('message');
        var $sender = $('<div>').addClass('sender').text(sender + ':');
        var $content = $('<div>').addClass('content').addClass(type);

        if (sender == 'AudiosensAI') {
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


