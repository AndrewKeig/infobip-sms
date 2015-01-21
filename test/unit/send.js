'use strict';

var request = require('request');
var sinon   = require('sinon');
var expect  = require('chai').expect;
var Infobip = require('../../lib');

describe('infobip send sms', function () {

	describe('When sending an sms', function() {
	  var sms;
	  var stub;
	  var response;
	  var error;

	  var username = 'username';
	  var password = 'password';

	  var sender = 'Sender';
	  var msg = 'Hello';
	  var options = { text : true };
	  var recipients = [{
	    gsm: '447940413568'
	  }];

	  var expected 	= { results: [{ status:"0", messageid: "072101113352779063", destination : "447940413578"} ]}

	  before(function(done){
	  	sms = new Infobip(username, password);
		stub = sinon.stub(request, 'post').yields(null, null, expected);

		sms.send(sender, msg, recipients, options, function(e, r){
			//console.log(e, r);
			response = r;
			error = e;
            stub.restore();
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
		expect(response.results[0].messageid).equal('072101113352779063');
	  });

	  it('should contain phone number', function () {
		expect(response.results[0].destination).equal('447940413578');
	  });

	  it ('should call api once', function () {
		expect(stub.calledOnce).to.be.true;
	  });
	});

	describe('When sending sms infobip returns error', function() {
	  var sms;
	  var stub;
	  var response;
	  var error;

	  var username = 'username';
	  var password = 'password';

	  var sender = 'Sender';
	  var msg = 'Hello';
	  var options = { text : true };
	  var recipients = [{
	    gsm: '000000000000'
	  }];

	  var expected 	= { results: [{ status:"-13", messageid: "072101113352779063", destination : "000000000000"} ]}

	  before(function(done){
	  	sms = new Infobip(username, password);
		stub = sinon.stub(request, 'post').yields(null, null, expected);

		sms.send(sender, msg, recipients, options, function(e, r){
			//console.log(e, r);
			response = r;
			error = e;
            stub.restore();
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
		expect(response.results[0].status).equal('-13');
	  });

	  it('should contain message id', function () {
		expect(response.results[0].messageid).equal('072101113352779063');
	  });

	  it('should contain phone number', function () {
		expect(response.results[0].destination).equal('000000000000');
	  });

	  it ('should call api once', function () {
		expect(stub.calledOnce).to.be.true;
	  });
	});

	describe('When sending sms fails validation', function() {
	  var sms;
	  var stub;
	  var response;
	  var error;

	  var username = 'username';
	  var password = 'password';

	  var sender = 'Sender';
	  var msg = 'Hello';
	  var options = { text : true };
	  var recipients = [{
	    gsm: '000000000000'
	  }];

	  before(function(done){
	  	sms = new Infobip(username, password);
		stub = sinon.stub(sms, '_validate').yields('username invalid', null, null);

		sms.send(sender, msg, recipients, options, function(e, r){
			//console.log(e, r);
			response = r;
			error = e;
            stub.restore();
			done();
		});
	  });

	  it('should not return response', function () {
		expect(response).empty;
	  });

	  it('should return error', function () {
		expect(error.message).to.equal('Invalid message: username invalid');
	  });

	  it ('should call api once', function () {
		expect(stub.calledOnce).to.be.true;
	  });
	});

	describe('When sending sms returns a post error', function() {
	  var sms;
	  var stub;
	  var response;
	  var error;

	  var username = 'username';
	  var password = 'password';

	  var sender = 'Sender';
	  var msg = 'Hello';
	  var options = { text : true };
	  var recipients = [{
	    gsm: '000000000000'
	  }];

	  var expected 	= { 
		  	requestError : {
		  		serviceException : {
		  			text : 'error'
		  		}
		  	}
	  };

	  before(function(done){
	  	sms = new Infobip(username, password);
		stub = sinon.stub(request, 'post').yields('error', null, expected);

		sms.send(sender, msg, recipients, options, function(e, r){
			//console.log(e, r);
			response = r;
			error = e;
            stub.restore();
			done();
		});
	  });

	  it('should not return response', function () {
		expect(response).empty;
	  });

	  it('should return error', function () {
		expect(error.message).to.equal('Invalid message: ' + expected.requestError.serviceException.text);
	  });

	  it ('should call api once', function () {
		expect(stub.calledOnce).to.be.true;
	  });
	});
});