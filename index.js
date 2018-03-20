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
                        "text": "This is Pournima's musicplayer."
                    },
                    "card": {
                        "type": "Standard",
                        "title": "Welcome",
                        "text": "Welcome to pournima's music player",
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
            if (jsonData.request.intent.name == "Playlist") {
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
            } else if (jsonData.request.intent.name == "songs") {
                if (typeof jsonData.request.intent.slots.songs.score != "undefined") {
                    var city = jsonData.request.intent.slots.songs.score;
                    if (jsonData.request.dialogState == "STARTED") {
                        responseBody = {
                            "version": "1.0",
                            "response": {
                                "directives": [
                                    {
                                        "type": "Dialog.Delegate",
                                        "updatedIntent": {
                                            "name": "Playlist",
                                            "confirmationStatus": "NONE",
                                            "slots": {
                                                "songs": {
                                                    "name": "songs",
                                                    "value": song,
                                                    "confirmationStatus": "NONE"
                                                }
                                            }
                                        }
                                    }
                                ],
                                "shouldEndSession": false
                            }
                        };
                    } else if (jsonData.request.dialogState == "IN_PROGRESS" && jsonData.request.intent.slots.songs.confirmationStatus == "CONFIRMED") {
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
                                            "name": "Playlist",
                                            "confirmationStatus": "NONE",
                                            "slots": {
                                                "cityName": {
                                                    "name": "songs",
                                                    "value": song2,
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
                                    "name": "Playlist",
                                    "confirmationStatus": "NONE",
                                    "slots": {
                                        "cityName": {
                                            "name": "Playlist",
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
                        "outputSpeech": { "type": 'SSML', "ssml": '<speak>Goodbye!</speak>' } 
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
