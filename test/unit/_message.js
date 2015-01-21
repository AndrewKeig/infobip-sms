'use strict';

var randomstring 	= require("randomstring");
var expect  		= require('chai').expect;
var Infobip 		= require('../../lib');

describe('send sms create message', function () {

	describe('When creating a message', function() {
		var username = 'username';
		var password = 'password';
		var sender = 'Sender';
		var msg = 'Hello';
		var options = { text : true };
		var recipients = [{
			gsm: '447940413578'
		}];
		

		var sms = new Infobip(username, password);
		var payload = sms._message(sender, msg, recipients, options);
		
		//console.log(payload.messages);

		it ('should contain username', function () {
			expect(payload.authentication.username).to.equal(username);	
		});

		it ('should contain password', function () {
			expect(payload.authentication.password).to.equal(password);	
		});

		it ('should contain text', function () {
			expect(payload.messages[0].text).to.equal(msg);	
		});

		it ('should contain sender', function () {
			expect(payload.messages[0].sender).to.equal(sender);	
		});

		it ('should contain recipients', function () {
			expect(payload.messages[0].recipients).to.equal(recipients);	
		});
	});

	describe('When creating a long message', function() {
		var username = 'username';
		var password = 'password';
		var sender = 'Sender';
		var type = 'longSMS';
		var msg = randomstring.generate(200);
		var options = { text : true };
		var recipients = [{
			gsm: '447940413578'
		}];
		

		var sms = new Infobip(username, password);
		var payload = sms._message(sender, msg, recipients, options);
		
		//console.log(payload.messages);

		it ('should contain username', function () {
			expect(payload.authentication.username).to.equal(username);	
		});

		it ('should contain password', function () {
			expect(payload.authentication.password).to.equal(password);	
		});

		it ('should contain text', function () {
			expect(payload.messages[0].text).to.equal(msg);	
		});

		it ('should contain type long sms', function () {
			expect(payload.messages[0].type).to.equal(type);	
		});

		it ('should contain sender', function () {
			expect(payload.messages[0].sender).to.equal(sender);	
		});

		it ('should contain recipients', function () {
			expect(payload.messages[0].recipients).to.equal(recipients);	
		});
	});

	describe('When creating a message in binary ', function() {
		var username = 'username';
		var password = 'password';
		var sender = 'Sender';
		var msg = 'Hello';
		var options = { binary : true };
		var recipients = [{
			gsm: '447940413578'
		}];
		

		var sms = new Infobip(username, password);
		var payload = sms._message(sender, msg, recipients, options);
		
		//console.log(payload.messages);

		it ('should contain username', function () {
			expect(payload.authentication.username).to.equal(username);	
		});

		it ('should contain password', function () {
			expect(payload.authentication.password).to.equal(password);	
		});

		it ('should contain binary', function () {
			var buffer = new Buffer(msg);
    		var binary = buffer.toString('hex');
			expect(payload.messages[0].binary).to.equal(binary);	
		});

		it ('should contain sender', function () {
			expect(payload.messages[0].sender).to.equal(sender);	
		});

		it ('should contain recipients', function () {
			expect(payload.messages[0].recipients).to.equal(recipients);	
		});
	});

	describe('When creating a message with a validity period', function() {
		var username = 'username';
		var password = 'password';
		var sender = 'Sender';
		var msg = 'Hello';
		var options = { text : true, ValidityPeriod : '01:00' };
		var recipients = [{
			gsm: '447940413578'
		}];
		

		var sms = new Infobip(username, password);
		var payload = sms._message(sender, msg, recipients, options);
		
		//	console.log(payload.messages);

		it ('should contain username', function () {
			expect(payload.authentication.username).to.equal(username);	
		});

		it ('should contain password', function () {
			expect(payload.authentication.password).to.equal(password);	
		});

		it ('should contain text', function () {
			expect(payload.messages[0].text).to.equal(msg);	
		});

		it ('should contain validity period', function () {
			expect(payload.messages[0].ValidityPeriod).to.equal(options.ValidityPeriod);	
		});

		it ('should contain sender', function () {
			expect(payload.messages[0].sender).to.equal(sender);	
		});

		it ('should contain recipients', function () {
			expect(payload.messages[0].recipients).to.equal(recipients);	
		});
	});

	describe('When creating a message with a send date time', function() {
		var username = 'username';
		var password = 'password';
		var sender = 'Sender';
		var msg = 'Hello';
		var options = { text : true, sendDateTime : '0d0h5m0s' };
		var recipients = [{
			gsm: '447940413578'
		}];
		

		var sms = new Infobip(username, password);
		var payload = sms._message(sender, msg, recipients, options);
		
		//console.log(payload.messages);

		it ('should contain username', function () {
			expect(payload.authentication.username).to.equal(username);	
		});

		it ('should contain password', function () {
			expect(payload.authentication.password).to.equal(password);	
		});

		it ('should contain text', function () {
			expect(payload.messages[0].text).to.equal(msg);	
		});

		it ('should contain send date time', function () {
			expect(payload.messages[0].sendDateTime).to.equal(options.sendDateTime);	
		});

		it ('should contain sender', function () {
			expect(payload.messages[0].sender).to.equal(sender);	
		});

		it ('should contain recipients', function () {
			expect(payload.messages[0].recipients).to.equal(recipients);	
		});
	});
});
