var express = require('express')
, app = express()
, server = require('http').createServer(app)
, deasync = require('deasync')
, music = require('./api/musicApi.js')
, port = process.env.PORT || 3000
, request = require('request');

// Creates the website server on the port #

// Handles the route for echo apis
app.post('/webhook', function(req, res){
  var requestBody = "";

  // Will accumulate the data
  req.on('data', function(data){
    requestBody+=data;
  });

  // Called when all data has been accumulated
    req.on('end', function()  {
        var responseBody = {};

        // parsing the requestBody for information
        var jsonData = JSON.parse(requestBody);
        if(jsonData.request.type == "LaunchRequest") {
        // crafting a response
            responseBody = {
                "version": "0.1",
                "response": {
                    "outputSpeech": {
                        "type": "PlainText",
                        "text": "Welcome to Shubham's Stormy weather assistant! Please say a command."
                    },
                    "card": {
                        "type": "Standard",
                        "title": "Welcome",
                        "text": "Welcome to stormy weather assistant",
                        "image": {
                            "smallImageUrl": "https://i.imgur.com/YlKp2nd.jpg",
                            "largeImageUrl": "https://i.imgur.com/YlKp2nd.jpg"
                        }
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
        } else if(jsonData.request.type == "IntentRequest") {
            var outputSpeechText = "";
            var cardContent = "";
            if (jsonData.request.intent.name == "WeatherIntent") {
                //response modified
                // The Intent "TurnOn" was successfully called
                responseBody = {
                    "version": '1.0',
                    "response": {
                        "shouldEndSession": true,
                        "outputSpeech": { "type": 'SSML', "ssml": '<speak> Hello from node JS </speak>' } 
                    },
                    "sessionAttributes": {},
                    "userAgent": 'ask-nodejs/1.0.25 Node/v6.10.0'
                }
            } else if (jsonData.request.intent.name == "cityIntent") {
                if (typeof jsonData.request.intent.slots.cityName.value != "undefined") {
                    var city = jsonData.request.intent.slots.cityName.value;
                    if (jsonData.request.dialogState == "STARTED") {
                        //var outputSpeechText = "humidity is " + response.body.main.humidity + " with " + response.body.weather[0].description + ".";
                        responseBody = {
                            "version": "1.0",
                            "response": {
                                "directives": [
                                    {
                                        "type": "Dialog.Delegate",
                                        "updatedIntent": {
                                            "name": "cityIntent",
                                            "confirmationStatus": "NONE",
                                            "slots": {
                                                "cityName": {
                                                    "name": "cityName",
                                                    "value": city,
                                                    "confirmationStatus": "NONE"
                                                }
                                            }
                                        }
                                    }
                                ],
                                "shouldEndSession": false
                            }
                        };
                    } else if (jsonData.request.dialogState == "IN_PROGRESS" && jsonData.request.intent.slots.cityName.confirmationStatus == "CONFIRMED") {
                        let response = deasync(function(callback){
                            weather.cityWeather(city, callback);
                        })();

                        var outputSpeechText = "Right now in " + city +", humidity is " + response.body.main.humidity + " with " + response.body.weather[0].description + ".";
                        responseBody = {
                            "version": '1.0',
                            "response": {
                                "shouldEndSession": true,
                                "outputSpeech": { "type": 'SSML', "ssml": '<speak>' + outputSpeechText + '</speak>' } 
                            },
                            "sessionAttributes": {},
                            "userAgent": 'ask-nodejs/1.0.25 Node/v6.10.0'
                        };
                    } else if (jsonData.request.dialogState == "IN_PROGRESS" && jsonData.request.intent.slots.cityName.confirmationStatus == "DENIED") {
                        var city2 = jsonData.request.intent.slots.cityName.value;
                        responseBody = {
                            "version": "1.0",
                            "response": {
                                "directives": [
                                    {
                                        "type": "Dialog.Delegate",
                                        "updatedIntent": {
                                            "name": "cityIntent",
                                            "confirmationStatus": "NONE",
                                            "slots": {
                                                "cityName": {
                                                    "name": "cityName",
                                                    "value": city2,
                                                    "confirmationStatus": "DENIED"
                                                }
                                            }
                                        }
                                    }
                                ],
                                "shouldEndSession": false
                            }
                        };
                    } else if (jsonData.request.dialogState == "IN_PROGRESS") {
                        let response = deasync(function(callback){
                            weather.cityWeather(city, callback);
                        })();

                        var outputSpeechText = "Right now in " + city +", humidity is " + response.body.main.humidity + " with " + response.body.weather[0].description + ".";
                        responseBody = {
                            "version": '1.0',
                            "response": {
                                "shouldEndSession": true,
                                "outputSpeech": { "type": 'SSML', "ssml": '<speak>' + outputSpeechText + '</speak>' } 
                            },
                            "sessionAttributes": {},
                            "userAgent": 'ask-nodejs/1.0.25 Node/v6.10.0'
                        };
                    }
                } else {
                    responseBody = {
                        "version": "1.0",
                        "response": {
                        "directives": [
                            {
                                "type": "Dialog.Delegate",
                                "updatedIntent": {
                                    "name": "cityIntent",
                                    "confirmationStatus": "NONE",
                                    "slots": {
                                        "cityName": {
                                            "name": "cityName",
                                            "confirmationStatus": "NONE"
                                        }
                                    }
                                }
                            }
                        ],
                        "shouldEndSession": false
                        }
                    };
                }
            } else if (jsonData.request.intent.name == "satisfactoryIntent") {
                responseBody = {
                    "version": '1.0',
                    "response": {
                        "shouldEndSession": true,
                        "outputSpeech": { "type": 'SSML', "ssml": '<speak>Thanks for using our weather assistant. Goodbye!</speak>' } 
                    },
                    "sessionAttributes": {},
                    "userAgent": 'ask-nodejs/1.0.25 Node/v6.10.0'
                };
            }
        }
        res.statusCode = 200;
        res.contentType('application/json');
        res.send(responseBody);
    });
});
        // parsing the requestBody for information


app.listen(port);
