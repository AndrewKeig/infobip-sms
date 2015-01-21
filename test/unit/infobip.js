'use strict';

var expect  = require('chai').expect;
var Infobip = require('../../lib');

describe('creating an infobip instance', function () {
	
	describe('When creating a new infobip instance', function() {

	  var primaryBasePath 		= 'http://api.infobip.com/api/v3/';
	  var secondaryBasePath  	= 'http://api2.infobip.com/api/v3/';
	  var contentType 			= 'application/json';
	  var username 				= 'username';
	  var password 				= 'password';
	  //var authorization = 'Basic ' + new Buffer(username + ':' + password).toString('base64');

	  var sms = new Infobip(username, password);

	  it ('should return new instance', function () {
		expect(sms).not.be.empty;
	  });

	  it ('should contain username', function () {
		expect(sms).to.have.property('username').and.equal(username);
	  });

	  it ('should contain password', function () {
		expect(sms).to.have.property('password').and.equal(password);
	  });

	  it ('should contain primary base path', function () {
		expect(sms).to.have.property('primaryBasePath').and.equal(primaryBasePath);
	  });

	  it ('should contain secondary base path', function () {
		expect(sms).to.have.property('secondaryBasePath').and.equal(secondaryBasePath);
	  });

	  it ('should contain content type', function () {
		expect(sms).to.have.property('contentType').and.equal(contentType);
	  });

	 //  it ('should contain authorization', function () {
		// expect(sms).to.have.property('authorization').and.equal(authorization);
	 //  });
	});

	describe('When creating a new infobip instance with no username', function() {

	  var username = '';
	  var password = 'password';

	  it ('should throw an error', function () {

	  	var sms;

	  	try {
	  		sms = new Infobip(username, password);
	  		
	  	} catch(ex) {
	  		expect(sms).to.be.empty;
			expect(ex.toString()).equal('InfobipError: Please provide a username');
	  	}
	  });
	});

	describe('When creating a new infobip instance with no password', function() {

	  var username = 'username';
	  var password = '';

	  it ('should throw an error', function () {

	  	var sms;

	  	try {
	  		sms = new Infobip(username, password);
	  		
	  	} catch(ex) {
	  		expect(sms).to.be.empty;
			expect(ex.toString()).equal('InfobipError: Please provide a password');
	  	}
	  });
	});
});