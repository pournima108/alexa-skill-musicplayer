var express = require('express')
, app = express()
, server = require('http').createServer(app)
, port = process.env.PORT || 3000
,Alexa = require('alexa-sdk')
, request = require('request');

// Creates the website server on the port #

// Handles the route for echo apis
app.post('/webhook', function(req, res){
    var requestBody = "";
    req.on('data', function(data){
        requestBody+= data;
      });
    
      req.on('end', function()  {
        var responseBody = {};
       var jsonData = JSON.parse(requestBody); 
      if(jsonData.request.type == "LaunchRequest") {
        // sending a response
            responseBody = {
                "version": "0.1",
                "response": {
                    "outputSpeech": {
                        "type": "PlainText",
                        "text": 'Welcome to  Calculator app . You can ask a question like, what\'s the' +
                        ' summation of 5 and 3? ... Now, what can I help you with.',
                    },
                    "card": {
                        "type": "Standard",
                        "title": "Welcome",
                        "text": "Welcome to Calculator app",
                    },
                    "reprompt": {
                        "outputSpeech": {
                            "type": "PlainText",
                            "text": "Say a command"
                        }
                    },
                    "shouldEndSession": false
                }
            };
        }
        else if(jsonData.request.type == "IntentRequest") {
            if (jsonData.request.intent.name == "AddIntent") {
                var numberOneSlot = jsonData.request.intent.slots.NumberOne;
		        var numberTwoSlot = jsonData.request.intent.slots.NumberTwo;
                var numberOne;
                var numberTwo;
                    if (numberOneSlot && numberOneSlot.value) {
                    console.log(numberOneSlot.value);
                    numberOne = parseInt(numberOneSlot.value, 10);
                    console.log(numberOne)
                    } 
                    if (numberTwoSlot && numberTwoSlot.value) {
                    console.log(numberTwoSlot.value);
                    numberTwo = parseInt(numberTwoSlot.value, 10);
                    console.log(numberTwo)
                    }
                var cardTitle = 'ADDITION';
		        var speechOutput;
		            if(numberOne == undefined || numberTwo == undefined){
                    speechOutputText = 'need two numbers to add, please try again';
                    console.log(speechOutputText)
		            } else {
                        speechOutputText = 'the summation of ' + numberOne + ' and ' + numberTwo + ' is ' + (numberOne + numberTwo);
                    console.log(speechOutputText)
		            }
                    responseBody = {
                    "version": '1.0',
                    "response": {
                        "shouldEndSession": false,
                        "outputSpeech": { "type": 'SSML', "ssml": '<speak>' + speechOutputText+ '</speak>' } 
                    },
                    "card": {
                        "type": "Standard",
                        "title": "Addition",
                        "text": "Welcome to Calculator app",
                    },
                    "reprompt": {
                        "outputSpeech": {
                            "type": "PlainText",
                            "text": "Say a command"
                        },
                    "sessionAttributes": {},
                    "userAgent": 'ask-nodejs/1.0.25 Node/v6.10.0'
                    }
                    }
                }
                else if(jsonData.request.intent.name == "SubIntent"){
                    var numberOneSlot = jsonData.request.intent.slots.NumberOne;
		            var numberTwoSlot = jsonData.request.intent.slots.NumberTwo;
                    var numberOne;
                    var numberTwo;
                    if (numberOneSlot && numberOneSlot.value) {
                    console.log(numberOneSlot.value);
                    numberOne = parseInt(numberOneSlot.value, 10);
                    console.log(numberOne)
                    } 
                    if (numberTwoSlot && numberTwoSlot.value) {
                    console.log(numberTwoSlot.value);
                    numberTwo = parseInt(numberTwoSlot.value, 10);
                    console.log(numberTwo)
                    }
                    var cardTitle = 'SUBTRACTION';
                    var speechOutput;
                    if(numberOne == undefined || numberTwo == undefined){
                        speechOutputText = 'need two numbers to subtract, please try again';
                        console.log(speechOutputText)
                    } else {
                        speechOutputText = 'the subtraction of ' + numberOne + ' and ' + numberTwo + ' is ' + (numberOne - numberTwo);
                        console.log(speechOutputText)
                    }
                    responseBody = {
                        "version": '1.0',
                        "response": {
                            "shouldEndSession": false,
                            "outputSpeech": { "type": 'SSML', "ssml": '<speak>' + speechOutputText+ '</speak>' } 
                        },
                        "card": {
                            "type": "Standard",
                            "title": "Subtraction",
                            "text": "Welcome to Calculator app",
                        },
                        "reprompt": {
                            "outputSpeech": {
                                "type": "PlainText",
                                "text": "Say a command"
                            },
                        "sessionAttributes": {},
                        "userAgent": 'ask-nodejs/1.0.25 Node/v6.10.0'
                        }
                        }
                }
                else if (jsonData.request.intent.name == "MulIntent") {
                    var numberOneSlot = jsonData.request.intent.slots.NumberOne;
		            var numberTwoSlot = jsonData.request.intent.slots.NumberTwo;
                    var numberOne;
                    var numberTwo;
                    if (numberOneSlot && numberOneSlot.value) {
                    console.log(numberOneSlot.value);
                    numberOne = parseInt(numberOneSlot.value, 10);
                    console.log(numberOne)
                    } 
                    if (numberTwoSlot && numberTwoSlot.value) {
                    console.log(numberTwoSlot.value);
                    numberTwo = parseInt(numberTwoSlot.value, 10);
                    console.log(numberTwo)
                    }
                    var cardTitle = 'MULTIPLICATION';
                    var speechOutput;
                    if(numberOne == undefined || numberTwo == undefined){
                        speechOutputText = 'need two numbers to multiply, please try again';
                        console.log(speechOutputText)
                    } else {
                        speechOutputText = 'the multiplication of ' + numberOne + ' and ' + numberTwo + ' is ' + (numberOne * numberTwo);
                        console.log(speechOutputText)
                    }
                    responseBody = {
                        "version": '1.0',
                        "response": {
                            "shouldEndSession": false,
                            "outputSpeech": { "type": 'SSML', "ssml": '<speak>' + speechOutputText+ '</speak>' } 
                        },
                        "card": {
                            "type": "Standard",
                            "title": "Multiplication",
                            "text": "Welcome to Calculator app",
                        },
                        "reprompt": {
                            "outputSpeech": {
                                "type": "PlainText",
                                "text": "Say a command"
                            },
                        "sessionAttributes": {},
                        "userAgent": 'ask-nodejs/1.0.25 Node/v6.10.0'
                        }
                        }
                }
                }
                else if (jsonData.request.intent.name == "satisfactoryIntent") {
                responseBody = {
                "version": '1.0',
                "response": {
                    "shouldEndSession": true,
                    "outputSpeech": { "type": 'SSML', "ssml": '<speak> Goodbye!</speak>' } 
                },
                "sessionAttributes": {},
                "userAgent": 'ask-nodejs/1.0.25 Node/v6.10.0'
            };
        }
        res.statusCode = 200;
        res.contentType('application/json');
        res.send(responseBody);
    });

    });
        // parsing the requestBody for information


app.listen(port);
