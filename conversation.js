
var Botkit = require('botkit');
var microservice = require("./microservice"); 

/////////// exporting the entry point to the conversation
exports.step0=step0;
//////////

// all the variables to store the data of the conversation
var zipcode, lastname, distance, gender, specialty;

function step0(response, convo) {
	convo.ask('Looking for a doctor? (yes/no)', [
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

function step1(response, convo) {
	convo.ask('Great!\nWe only cover Washington State.\nWhich Zip code are you interested on (or no to finish)?', [
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
			zipcode=response.text;
			step2(response, convo);
			convo.next();
		}
	}]);
}

function step2(response, convo) {
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

function step3(response, convo) {
	convo.ask('Do you have a gender preference (yes/no)?', [
	{
		pattern: 'no',
		callback: function(response,convo) {
			gender=' ';
			step4(response, convo);
			convo.next();
		}
	},
	{
		default: true,
		callback: function(response,convo) {
			step31(response, convo);
			convo.next();
		}
	}]);
}

function step31(response, convo) {
	convo.ask('Do you prefere a Male or Female doctor (or no to finish)?', [
	{
		pattern: 'no',
		callback: function(response,convo) {
			convo.say('Perhaps later. Good bye!');
			convo.next();
		}
	},
	{
		pattern: 'Male',
		callback: function(response,convo) {
			gender='M';
			step4(response, convo);
			convo.next();
		}
	},
	{
		default: true,
		callback: function(response,convo) {
			gender='F';
			step4(response, convo);
			convo.next();
		}
	}]);
}

function step4(response, convo) {
	convo.ask('Include the lastname of the doctor if you know it (or no to finish)', [
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

function step5(response, convo) {
	convo.ask('Include the specialty you are looking for (or no to finish)', [
	{
		pattern: 'no',
		callback: function(response,convo) {
			convo.say('Perhaps later. Good bye!');
			convo.next();
		}
	},
	{
		pattern: 'nada',
		callback: function(response,convo) {
			specialty='';
			microservice.getSearchResults(zipcode, lastname, distance, gender, specialty)
				.then( function(res) {
					convo.say(res);
					convo.next();
				});
		}
	},
	{
		default: true,
		callback: function(response,convo) {
			specialty=response.text;
			microservice.getSearchResults(zipcode, lastname, distance, gender, specialty)
				.then( function(res) {
					convo.say(res);
					convo.next();
				});
		}
	}]);
}

function result(response, convo) {
	convo.say('Ok! This is what we know');
	convo.say('Zipcode: ' + zipcode);
	convo.say('Distance: ' + distance);
	convo.say('Gender: ' + gender);
	convo.say('Lastname: ' + lastname);
	convo.say('Speciality: ' + specialty);
}