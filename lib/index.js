'use strict';

var util    = require('util');
var Joi     = require('joi');
var request = require('request');
var _       = require('lodash');

function InfobipError(message){
  Error.call(this);
  Error.captureStackTrace(this, this.constructor);
  this.message = message;
  this.name = this.constructor.name;
}

util.inherits(InfobipError, Error);
  
var InfobipSms = function InfobipSms(username, password) {
  if (!username) {
    throw new InfobipError('Please provide a username');
  }
  
  if (!password) {
    throw new InfobipError('Please provide a password');
  }

  this.password           = password;
  this.username           = username;
  this.primaryBasePath    = 'http://api.infobip.com/api/v3/';
  this.secondaryBasePath  = 'http://api2.infobip.com/api/v3/';
  this.contentType        = 'application/json';
};

InfobipSms.prototype.send = function(sender, msg, recipients, options, callback) {
  var _this = this;

  var payload = this._message(sender, msg, recipients, options);

  this._validate(payload, function(err){
    if (err) { 
      return callback(new InfobipError('Invalid message: ' + err)); 
    }

    var url = _this.primaryBasePath + 'sendsms/json';
    var options = _this._setOptions(url, { body : payload });

    request.post(options, function(err, res, body){
      if (err) { 
        return callback(new InfobipError('Invalid message: ' + body.requestError.serviceException.text)); 
      }

      return callback(null, body);
    });
  });
};

InfobipSms.prototype._validate = function(payload, callback) {
  var schema = Joi.object({
    authentication: Joi.object().keys({
      username: Joi.string().required(),
      password: Joi.string().required()
    }),
    messages: Joi.array().min(1).includes(Joi.object().keys({
      sender: Joi.alternatives().try(Joi.number().max(14), Joi.string().max(11)).required(),
      text: Joi.string(),
      binary : Joi.binary().encoding('hex'),
      IsFlash : Joi.number().valid(0,1),
      type : Joi.string().allow('bookmark', 'LongSMS', 'nSMS'),
      ValidityPeriod : Joi.string(),
      sendDateTime : Joi.string(),
      recipients: Joi.array().min(1).includes(Joi.object().keys({
        gsm: Joi.string().required(), 
        messageId: Joi.string()
      }))
    }))
  });

  Joi.validate(payload, schema, { allowUnknown : true }, function (err, value) {
    callback(err, value);
  });
};

InfobipSms.prototype._message = function(sender, msg, recipients, options) {
  var sms = {
    sender: sender,
    recipients: recipients 
  };

  if (options.text) {
    sms.text = msg.toString('utf8');
  }

  if (options.binary) {
    var buffer = new Buffer(msg);
    sms.binary = buffer.toString('hex');
  }

  if (options.ValidityPeriod) {
    sms.ValidityPeriod = options.ValidityPeriod;
  }

  if (options.sendDateTime) {
    sms.sendDateTime = options.sendDateTime;
  }

  if (msg.length > 160) {
    sms.type = 'longSMS';
  }

  return {
    authentication: {
      username: this.username,
      password: this.password
    },
    messages: [ sms ]
  };
};

InfobipSms.prototype._setOptions = function(url, payload) {
  if (!payload) { 
    payload = {}; 
  }

  var options = {
    'url': url,
    'headers': {
      'Content-type': this.contentType
    },
    'json': true
  };

  return _.extend(options, payload);
};

module.exports = InfobipSms;