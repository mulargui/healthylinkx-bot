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
controller.hears(['hello', 'hi'], ['direct_message','direct_mention','mention'], function(bot,message) {
	bot.startConversation(message, step0);
});

step0 = function(response, convo) {
	convo.ask('step0?', [
	{
		pattern: 'done',
		callback: function(response,convo) {
			convo.say('OK you are done!');
			convo.next();
		}
	},
	{
		pattern: 'yes',
		callback: function(response,convo) {
			convo.say('Great! I will continue...');
			step1(response, convo);
			convo.next();
		}
	},
	{
		pattern: 'no',
		callback: function(response,convo) {
			convo.say('Perhaps later.');
			// do something else...
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
	convo.ask('step1?', function(response, convo) {
		convo.say('Awesome, you said: #' + response.text + '#');
		step2(response, convo);
		convo.next();
	});
}

step2 = function(response, convo) {
	convo.ask('step2?', function(response, convo) {
		convo.say('Ok, you said: #' + response.text + '#');
		step3(response, convo);
		convo.next();
	});
}

step3 = function(response, convo) {
	convo.ask('step3?', function(response, convo) {
		convo.say('Ok, you said: #' + response.text + '#Good bye.');
		convo.next();
	});
}

