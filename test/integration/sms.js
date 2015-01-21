'use strict';

var randomstring = require("randomstring");
var request 	 = require('request');
var sinon   	 = require('sinon');
var expect   	 = require('chai').expect;
var Infobip 	 = require('../../lib');

describe.skip('infobip integration sms', function () {
	var sms;
	var response;
	var error;
	var username = '-------';
	var password = '-------';

	describe('When sending an sms with validity period', function() {
		// ValidityPeriod
		// ValidityPeriod pattern: HH:mm
		// Validity period longer then 48h is not supported (it will be automatically set to 48h in that case).

		var options = { text : true, ValidityPeriod : '01:00' };
		var sender = 'Andrew Keig';
		var msg = 'this message is valid for 1 hour'.toString('utf8');
		var recipients = [{ gsm: '447940413578', messageId : 'validity' }];

		before(function(done){
			sms = new Infobip(username, password);

			sms.send(sender, msg, recipients, options, function(e, r){
				//console.log(e, r);
				response = r;
				error = e;
				done();
			});
		});

		it('should return response', function () {
			expect(response).not.empty;
		});

		it('should not return error', function () {
			expect(error).to.be.null;
		});

		it('should contain sent status', function () {
			expect(response.results[0].status).equal('0');
		});

		it('should contain message id', function () {
			expect(response.results[0].messageid).equal('validity');
		});

		it('should contain phone number', function () {
			expect(response.results[0].destination).equal('447940413578');
		});
	});

	describe('When sending an sms with send date time', function() {
		var options = { text : true, sendDateTime : '0d0h5m0s' };
		var sender = 'Andrew Keig';
  	var msg = 'this message scheduled to be sent with 5 minute delay'.toString('utf8');
  	var recipients = [{ gsm: '447940413578', messageId : 'scheduled' }];

		before(function(done){
			sms = new Infobip(username, password);

			sms.send(sender, msg, recipients, options, function(e, r){
				//console.log(e, r);
				response = r;
				error = e;
				done();
			});
		});

		it('should return response', function () {
			expect(response).not.empty;
		});

		it('should not return error', function () {
			expect(error).to.be.null;
		});

		it('should contain sent status', function () {
			expect(response.results[0].status).equal('0');
		});

		it('should contain message id', function () {
			expect(response.results[0].messageid).equal('scheduled');
		});

		it('should contain phone number', function () {
			expect(response.results[0].destination).equal('447940413578');
		});
	});


	describe('When sending an sms in unicode', function() {
		//GSM Message destination address, must be in international format
		var options = { text : true };
		var sender = 'Andrew Keig';
  	var msg = 'this message is utf8'.toString('utf8');
  	var recipients = [{ gsm: '447940413578', messageId : 'unicode' }];

		//console.log(message);

		before(function(done){
			sms = new Infobip(username, password);

			sms.send(sender, msg, recipients, options, function(e, r){
				//console.log(e, r);
				response = r;
				error = e;
				done();
			});
		});

		it('should return response', function () {
			expect(response).not.empty;
		});

		it('should not return error', function () {
			expect(error).to.be.null;
		});

		it('should contain sent status', function () {
			expect(response.results[0].status).equal('0');
		});

		it('should contain message id', function () {
			expect(response.results[0].messageid).not.empty;
		});

		it('should contain phone number', function () {
			expect(response.results[0].destination).equal('447940413578');
		});
	});

	describe('When sending an sms with max 160 characters', function() {
		//Message body (at the moment 160 characters).

		var options = { text : true };
		var sender = 'Andrew Keig';
  	var msg = randomstring.generate(160);
  	var recipients = [{ gsm: '447940413578', messageId : 'max160characters' }];

		before(function(done){
			sms = new Infobip(username, password);

			sms.send(sender, msg, recipients, options, function(e, r){
				//console.log(e, r);
				response = r;
				error = e;
				done();
			});
		});

		it('should return response', function () {
			expect(response).not.empty;
		});

		it('should not return error', function () {
			expect(error).to.be.null;
		});

		it('should contain sent status', function () {
			expect(response.results[0].status).equal('0');
		});

		it('should contain message id', function () {
			expect(response.results[0].messageid).not.empty;
		});

		it('should contain phone number', function () {
			expect(response.results[0].destination).equal('447940413578');
		});
	});

	describe('When sending a long sms with 200 characters', function() {
		// Optional parameter:
		// To send WAP bookmarks: value has to be set to “bookmark”
		// To send concatenated SMS: value has to be set to “longSMS” (for text messages only) To send notification SMS: value has to be set to “nSMS”

		var options = { text : true, type : 'longSMS' };
		var sender = 'Andrew Keig';
		var msg = randomstring.generate(200);
		var recipients = [{ gsm: '447940413578', messageId : 'longSMS' }];

		before(function(done){
			sms = new Infobip(username, password);

			sms.send(sender, msg, recipients, options, function(e, r){
				//console.log(e, r);
				response = r;
				error = e;
				done();
			});
		});

		it('should return response', function () {
			expect(response).not.empty;
		});

		it('should not return error', function () {
			expect(error).to.be.null;
		});

		it('should contain sent status', function () {
			expect(response.results[0].status).equal('0');
		});

		it('should contain message id', function () {
			expect(response.results[0].messageid).not.empty;
		});

		it('should contain phone number', function () {
			expect(response.results[0].destination).equal('447940413578');
		});
	});

	describe('When sending an sms in binary hex', function() {
		//Binary content, using hexadecimal format. Example: 410A0D4243
		//Cannot be used together with “text” parameter

		var buffer = new Buffer('this message is binary hex');
		var options = { binary : true };
		var sender = 'Andrew Keig';
		var msg = buffer.toString('hex');
		var recipients = [{ gsm: '447940413578', messageId : 'binarymessgae' }];

		before(function(done){
			sms = new Infobip(username, password);

			sms.send(sender, msg, recipients, options, function(e, r){
				//console.log(e, r);
				response = r;
				error = e;
				done();
			});
		});

		it('should return response', function () {
			expect(response).not.empty;
		});

		it('should not return error', function () {
			expect(error).to.be.null;
		});

		it('should contain sent status', function () {
			expect(response.results[0].status).equal('0');
		});

		it('should contain message id', function () {
			expect(response.results[0].messageid).not.empty;
		});

		it('should contain phone number', function () {
			expect(response.results[0].destination).equal('447940413578');
		});
	});
});