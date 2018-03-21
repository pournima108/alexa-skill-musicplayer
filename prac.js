var Alexa = require('alexa-sdk');
var APP_ID = "amzn1.ask.skill.a0dbd87f-9d6a-4173-8a98-dce13010650a";
var SKILL_NAME = 'Calci';

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'NewSession': function () {
        this.attributes['speechOutput'] = 'Welcome to ' + SKILL_NAME + '. You can ask a question like, what\'s the' +
            ' summation of 5 and 3? ... Now, what can I help you with.';
        // If the user either does not reply to the welcome message or says something that is not
        // understood, they will be prompted again with this text.
        this.attributes['repromptSpeech'] = 'For instructions on what you can say, please say help me.';
        this.emit(':ask', this.attributes['speechOutput'], this.attributes['repromptSpeech'])
    },
	'AddIntent': function() {
		var numberOneSlot = this.event.request.intent.slots.NumberOne;
		var numberTwoSlot = this.event.request.intent.slots.NumberTwo;
        var numberOne;
		var numberTwo;
        if (numberOneSlot && numberOneSlot.value) {
			console.log(numberOneSlot.value);
            numberOne = parseInt(numberOneSlot.value, 10);
        } 
		if (numberTwoSlot && numberTwoSlot.value) {
			console.log(numberTwoSlot.value);
            numberTwo = parseInt(numberTwoSlot.value, 10);
        }
		var cardTitle = 'ADDITION';
		var speechOutput;
		if(numberOne == undefined || numberTwo == undefined){
			speechOutput = 'need two numbers to add, please try again';
			this.attributes['speechOutput'] = speechOutput;
            this.attributes['repromptSpeech'] = 'please try again';
            this.emit(':tell', speechOutput);
		} else {
			speechOutput = 'the summation of ' + numberOne + ' and ' + numberTwo + ' is ' + (numberOne + numberTwo);
			this.attributes['speechOutput'] = speechOutput
            this.emit(':tellWithCard', speechOutput, cardTitle, speechOutput);
		}
	},
	'SubIntent': function() {
		var numberOneSlot = this.event.request.intent.slots.NumberOne;
		var numberTwoSlot = this.event.request.intent.slots.NumberTwo;
        var numberOne;
		var numberTwo;
        if (numberOneSlot && numberOneSlot.value) {
            numberOne = parseInt(numberOneSlot.value, 10);
        } 
		if (numberTwoSlot && numberTwoSlot.value) {
            numberTwo = parseInt(numberTwoSlot.value, 10);
        }
		var cardTitle = 'SUBTRACTION';
		var speechOutput;
		if(numberOne == undefined || numberTwo == undefined){
			speechOutput = 'need two numbers to subtract, please try again';
			this.attributes['speechOutput'] = speechOutput;
            this.attributes['repromptSpeech'] = 'please try again';
            this.emit(':tell', speechOutput);
		} else {
			speechOutput = 'the subtraction of ' + numberOne + ' and ' + numberTwo + ' is ' + (numberOne - numberTwo);
			this.attributes['speechOutput'] = speechOutput
            this.emit(':tellWithCard', speechOutput, cardTitle, speechOutput);
		}
	},
	'MulIntent': function() {
		var numberOneSlot = this.event.request.intent.slots.NumberOne;
		var numberTwoSlot = this.event.request.intent.slots.NumberTwo;
        var numberOne;
		var numberTwo;
        if (numberOneSlot && numberOneSlot.value) {
            numberOne = parseInt(numberOneSlot.value, 10);
        } 
		if (numberTwoSlot && numberTwoSlot.value) {
            numberTwo = parseInt(numberTwoSlot.value, 10);
        }
		var cardTitle = 'MULTIPLICATION';
		var speechOutput;
		if(numberOne == undefined || numberTwo == undefined){
			speechOutput = 'need two numbers to multiply, please try again';
			this.attributes['speechOutput'] = speechOutput;
            this.attributes['repromptSpeech'] = 'please try again';
            this.emit(':tell', speechOutput);
		} else {
			speechOutput = 'the multiplication of ' + numberOne + ' and ' + numberTwo + ' is ' + (numberOne * numberTwo);
			this.attributes['speechOutput'] = speechOutput
            this.emit(':tellWithCard', speechOutput, cardTitle, speechOutput);
		}
	},
	'DivIntent': function() {
		var numberOneSlot = this.event.request.intent.slots.NumberOne;
		var numberTwoSlot = this.event.request.intent.slots.NumberTwo;
        var numberOne;
		var numberTwo;
        if (numberOneSlot && numberOneSlot.value) {
            numberOne = parseInt(numberOneSlot.value, 10);
        } 
		if (numberTwoSlot && numberTwoSlot.value) {
            numberTwo = parseInt(numberTwoSlot.value, 10);
        }
		var cardTitle = 'DIVISION';
		var speechOutput;
		if(numberOne == undefined || numberTwo == undefined){
			speechOutput = 'need two numbers to divide, please try again';
			this.attributes['speechOutput'] = speechOutput;
            this.attributes['repromptSpeech'] = 'please try again';
            this.emit(':tell', speechOutput);
		} else if(numberTwo == 0) {
			speechOutput = 'need divisor cannot be zero, please try again';
			this.attributes['speechOutput'] = speechOutput;
            this.attributes['repromptSpeech'] = 'please try again';
            this.emit(':tell', speechOutput);
		} else {
			speechOutput = 'the division of ' + numberOne + ' by ' + numberTwo + ' is ' + (numberOne/numberTwo);
			this.attributes['speechOutput'] = speechOutput
            this.emit(':tellWithCard', speechOutput, cardTitle, speechOutput);
		}
	},
    'AMAZON.HelpIntent': function () {
        this.attributes['speechOutput'] = 'You can ask questions such as, what\'s the summation of 5 and 3, or, you can say exit... ' +
            'Now, what can I help you with?';
        this.attributes['repromptSpeech'] = 'You can say things like, what\'s the difference between 5 and 3, or you can say exit...' +
            ' Now, what can I help you with?';
        this.emit(':ask', this.attributes['speechOutput'], this.attributes['repromptSpeech'])
    },
    'AMAZON.RepeatIntent': function () {
        this.emit(':ask', this.attributes['speechOutput'], this.attributes['repromptSpeech'])
    },
    'AMAZON.StopIntent': function () {
        this.emit('SessionEndedRequest');
    },
    'AMAZON.CancelIntent': function () {
        this.emit('SessionEndedRequest');
    },
    'SessionEndedRequest':function () {
        this.emit(':tell', 'Goodbye!');
    }
};

function calculator(option, numberOne, numberTwo){
	switch(option) {
    case 'add':
        return (numberOne + numberTwo);
    case 'sub':
        return (numberOne - numberTwo);
	case 'mul':
        return (numberOne * numberTwo);
	case 'div':
        return (numberOne / numberTwo);
	}
}