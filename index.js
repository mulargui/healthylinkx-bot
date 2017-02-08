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
var conversation = require("./conversation"); 

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
//controller.hears(['Hello', 'hi'], ['direct_message','direct_mention'], function(bot,message) {
controller.hears(['Hello', 'hi'], ['direct_message','direct_mention','mention', 'ambient'], function(bot,message) {
	bot.startConversation(message, conversation.step0);
});

