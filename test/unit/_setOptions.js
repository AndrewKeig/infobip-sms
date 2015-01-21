'use strict';

var expect  = require('chai').expect;
var Infobip = require('../../lib');

describe('send sms set options', function () {
	
	describe('When setting valid request options', function() {

	  var url = 'sendsms/json';
	  var username = 'username';
	  var password = 'password';
	  var contentType = 'application/json';

	  var sms = new Infobip(username, password);
	  var options = sms._setOptions(url);

	  it ('should return options', function () {
		expect(options).not.be.empty;
	  });

	  it ('should contain url', function () {
		expect(options).to.have.property('url').and.equal(url);
	  });

	  it ('should contain content type header', function () {
		expect(options.headers).to.have.property('Content-type').and.equal(contentType);
	  });

	  it ('should contain json format', function () {
		expect(options).to.have.property('json').and.equal(true);
	  });
	});

	describe('When setting request options with extended options', function() {

	  var url = 'sendsms/json';
	  var username = 'username';
	  var password = 'password';
	  var message = { body : 'hello' };

	  var sms = new Infobip(username, password);
	  var options = sms._setOptions(url, message);

	  it ('should return options', function () {
		expect(options).not.be.empty;
	  });

	  it ('should contain body', function () {
		expect(options).to.have.property('body').and.equal(message.body);
	  });
	});
});