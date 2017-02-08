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

//handle all incoming messages
// Note: Platforms such as Slack send many kinds of messages, not all of which contain a text field!
//controller.on('message_received', function(bot, message) {
	//bot.reply(message, 'I heard... something!');
//});

// reply to a mention
controller.on('mention',function(bot,message) {
  bot.reply(message,'Grabbing the mention');
});

// reply to a direct mention - @bot hello
controller.on('direct_mention',function(bot,message) {
  bot.reply(message,'I heard you mention me!');
});

// reply to a direct message
controller.on('direct_message',function(bot,message) {
  bot.reply(message,'You are talking directly to me');
});

// reply to a direct message
controller.on('ambient',function(bot,message) {
  bot.reply(message,'Hearing you guys');
});

// give the bot something to listen for.
/*controller.hears(['hello', 'hi'], ['direct_message','direct_mention','mention', 'ambient'], function(bot,message) {
	console.log("Message received");	
	bot.reply(message,'Hello yourself.');
});*/
