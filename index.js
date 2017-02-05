/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
# RUN THE BOT:
	Get a Bot token from Slack:
		-> http://my.slack.com/services/new/bot
	Run your bot from the command line:
		token=<MY TOKEN> node index.js
# EXTEND THE BOT:
	Botkit has many features for building cool and useful bots!
	Read all about it here:
		-> http://howdy.ai/botkit
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

var Botkit = require('botkit');

var controller = Botkit.slackbot({
	debug: false
	//include "log: false" to disable logging
	//or a "logLevel" integer from 0 to 7 to adjust logging verbosity
});

// connect the bot to a stream of messages
controller.spawn({
	token: process.env.token,
}).startRTM()

// give the bot something to listen for.
//controller.hears(['Hello', 'hi'], ['message_received'], function(bot,message) {
controller.hears(['Hello', 'hi'], ['direct_message','direct_mention','mention'], function(bot,message) {
	bot.startConversation(message, step0);
});

// all the variables to store the data of the conversation
var zipcode, lastname, distance, gender, speciality;

step0 = function(response, convo) {
	convo.ask('Looking for a doctor? (y/n)', [
	{
		pattern: 'yes',
		callback: function(response,convo) {
			step1(response, convo);
			convo.next();
		}
	},
	{
		pattern: 'no',
		callback: function(response,convo) {
			convo.say('Perhaps later. Good bye!');
			convo.next();
		}
	},
	{
		default: true,
		callback: function(response,convo) {
			// just repeat the question
			convo.repeat();
			convo.next();
		}
	}]);
}

step1 = function(response, convo) {
	convo.ask('Great!\nWe only cover Washington State.\nWhich Zip code are you interested (or no to finish)?', [
	{
		pattern: 'no',
		callback: function(response,convo) {
			convo.say('Perhaps later. Good bye!');
			convo.next();
		}
	},
	{
		default: true,
		callback: function(response,convo) {
			lastname=response.text;
			step2(response, convo);
			convo.next();
		}
	}]);
}

step2 = function(response, convo) {
	convo.ask('Which is max distance you are happy to go in miles (or no to finish)?', [
	{
		pattern: 'no',
		callback: function(response,convo) {
			convo.say('Perhaps later. Good bye!');
			convo.next();
		}
	},
	{
		default: true,
		callback: function(response,convo) {
			distance=response.text;
			step3(response, convo);
			convo.next();
		}
	}]);
}

step3 = function(response, convo) {
	convo.ask('Do you have a gender preference (y/n)?', [
	{
		pattern: 'no',
		callback: function(response,convo) {
			gender=response.text;
			step4(response, convo);
			convo.next();
		}
	},
	{
		default: true,
		callback: function(response,convo) {
			gender=response.text;
			step4(response, convo);
			convo.next();
		}
	}]);
}

step4 = function(response, convo) {
	convo.ask('Include lastname if you know it (or no to finish)', [
	{
		pattern: 'no',
		callback: function(response,convo) {
			convo.say('Perhaps later. Good bye!');
			convo.next();
		}
	},
	{
		default: true,
		callback: function(response,convo) {
			lastname=response.text;
			step5(response, convo);
			convo.next();
		}
	}]);
}

step5 = function(response, convo) {
	convo.ask('Include the speciality you are looking for (or no to finish)', [
	{
		pattern: 'no',
		callback: function(response,convo) {
			convo.say('Perhaps later. Good bye!');
			convo.next();
		}
	},
	{
		default: true,
		callback: function(response,convo) {
			speciality=response.text;
			result(response, convo);
			convo.next();
		}
	}]);
}

result = function(response, convo) {
	convo.say('Ok! This is what we know');
	convo.say('Zipcode: ', zipcode);
	convo.say('Distance: ', distance);
	convo.say('Gender: ', gender);
	convo.say('Lastname: ', lastname);
	convo.say('Speciality: ', speciality);
}