'use strict';

var expect  = require('chai').expect;
var Infobip = require('../../lib');

describe('send sms validate message', function () {

	describe('When validating message', function() {
	  var username = 'username';
	  var password = 'password';

	  var message = {
		authentication: {
			username: username,
			password: password
		},
		messages: [
			{
				sender: 'Sender',
				text: 'Hello',
				recipients: [{
					gsm: '447940413578'
				}]
			}
		]
	  };

	  var sms = new Infobip(username, password);

	  it ('should validate', function () {
	  	sms._validate(message, function(err){
	  		expect(err).to.be.null;	
	  	});
	  });
	});

	describe('When validating message with missing username', function() {
	  var username = 'username';
	  var password = 'password';

	  var message = {
		authentication: {
			username: '',
			password: password
		},
		messages: [
			{
				sender: 'Sender',
				text: 'Hello',
				recipients: [{
					gsm: '447940413578'
				}]
			}
		]
	  };

	  var sms = new Infobip(username, password);

	  it ('should return error', function () {
	  	sms._validate(message, function(err){
	  		//console.log(err.details);
	  		expect(err.details[0].message).equal('username is not allowed to be empty');	
	  	});
	  });
	});

	describe('When validating message with missing password', function() {
	  var username = 'username';
	  var password = 'password';

	  var message = {
		authentication: {
			username: username,
			password: ''
		},
		messages: [
			{
				sender: 'Sender',
				text: 'Hello',
				recipients: [{
					gsm: '447940413578'
				}]
			}
		]
	  };

	  var sms = new Infobip(username, password);

	  it ('should return error', function () {
	  	sms._validate(message, function(err){
	  		//console.log(err.details);
	  		expect(err.details[0].message).equal('password is not allowed to be empty');	
	  	});
	  });
	});

	describe('When validating message with missing message', function() {
	  var username = 'username';
	  var password = 'password';

	  var message = {
		authentication: {
			username: username,
			password: password
		},
		messages: []
	  };

	  var sms = new Infobip(username, password);

	  it ('should return error', function () {
	  	sms._validate(message, function(err){
	  		//console.log(err.details);
	  		expect(err.details[0].message).equal('messages must contain at least 1 items');	
	  	});
	  });
	});



// messages: Joi.array().includes(Joi.object().keys({
//       sender: Joi.alternatives().try(Joi.number().max(14), Joi.string().max(11)),
//       text: Joi.string(),
//       IsFlash : Joi.number().valid(0,1),
//       recipients: Joi.array().includes(Joi.object().keys({
//         gsm: Joi.string(), 
//         messageId: Joi.number()
//       }))
//     }))



	describe('When validating message with missing sender in message', function() {
	  var username = 'username';
	  var password = 'password';

	  var message = {
		authentication: {
			username: username,
			password: password
		},
		messages: [
			{
				text: 'Hello',
				recipients: [{
					gsm: '447940413578'
				}]
			}
		]
	  };

	  var sms = new Infobip(username, password);

	  it ('should return error', function () {
	  	sms._validate(message, function(err){
	  		//console.log(err.details);
	  		expect(err.details[0].message).equal('messages at position 0 fails because sender is required');	
	  	});
	  });
	});

	describe('When validating message with missing recipients in message', function() {
	  var username = 'username';
	  var password = 'password';

	  var message = {
		authentication: {
			username: username,
			password: password
		},
		messages: [
			{
				sender: 'Sender',
				text: 'Hello',
				recipients: []
			}
		]
	  };

	  var sms = new Infobip(username, password);

	  it ('should return error', function () {
	  	sms._validate(message, function(err){
	  		//console.log(err.details);
	  		expect(err.details[0].message).equal('messages at position 0 fails because recipients must contain at least 1 items');	
	  	});
	  });
	});

	describe('When validating message with recipients in message missing gsm', function() {
	  var username = 'username';
	  var password = 'password';

	  var message = {
		authentication: {
			username: username,
			password: password
		},
		messages: [
			{
				sender: 'Sender',
				text: 'Hello',
				recipients: [{
					gsm: ''
				}]
			}
		]
	  };

	  var sms = new Infobip(username, password);

	  it ('should return error', function () {
	  	sms._validate(message, function(err){
	  		//console.log(err.details);
	  		expect(err.details[0].message).equal('messages at position 0 fails because recipients at position 0 fails because gsm is not allowed to be empty');	
	  	});
	  });
	});

	describe('When validating message with invalid binary message', function() {
	  var username = 'username';
	  var password = 'password';

	  var message = {
		authentication: {
			username: username,
			password: password
		},
		messages: [
			{
				sender: 'Sender',
				binary: 'Hello',
				recipients: [{
					gsm: '447940413578'
				}]
			}
		]
	  };

	  var sms = new Infobip(username, password);

	  it ('should return error', function () {
	  	sms._validate(message, function(err){
	  		//console.log(err.details);
	  		expect(err.details[0].message).equal('messages at position 0 fails because binary must be a buffer or a string');	
	  	});
	  });
	});
});
