# infobip-sms

This is a node module for the infobip sms service; currently the only endpoint implemented is `sendsms`.

[![build status](https://travis-ci.org/AndrewKeig/infobip-sms.svg)](http://travis-ci.org/AndrewKeig/infobip-sms)


```
http://api.infobip.com/api/v3/sendsms/json
```

The infobip sms api has a single endpoint to send a message.  Various sens sms options are controlled via an `options` object.


### Create an infobip-sms instance
```
var Infobip = require('infobip-sms');
var sms = new Infobip('username', 'password');
```

### Send sms message

```
var sender = 'Andrew Keig';
var recipients = [{ gsm: '447940413578', messageId : 'validity' }];
var msg = 'standard message send'.toString('utf8');
var options = { text : true };

sms.send(sender, msg, recipients, options, function(e, r){
	if (err) { return 'woopsie daisy'; }
	console.log(e, r);
});
```

### API


#### Sending an sms with validity period

```
var msg = 'this message is valid for 1 hour'.toString('utf8');
var options = { text : true, ValidityPeriod : '01:00' };

sms = new Infobip(username, password);

sms.send(sender, msg, recipients, options, function(e, r){
	if (err) { return 'woopsie daisy'; }
	console.log(e, r);
});

```


#### Sending an sms with send date time

```
var options = { text : true, sendDateTime : '0d0h5m0s' };
var msg = 'this message scheduled to be sent with 5 minute delay'.toString('utf8');

sms = new Infobip(username, password);

sms.send(sender, msg, recipients, options, function(e, r){
	if (err) { return 'woopsie daisy'; }
	console.log(e, r);
});
  	
```

#### Sending an sms in unicode

```
var options = { text : true };
var msg = 'this message is utf8'.toString('utf8');
  	
sms = new Infobip(username, password);

sms.send(sender, msg, recipients, options, function(e, r){
	if (err) { return 'woopsie daisy'; }
	console.log(e, r);
});
```

#### Sending an sms with max 160 characters

```
var options = { text : true };
var msg = randomstring.generate(160);

sms = new Infobip(username, password);

sms.send(sender, msg, recipients, options, function(e, r){
	if (err) { return 'woopsie daisy'; }
	console.log(e, r);
});
```

#### Sending a long sms with 200 characters

```
var options = { text : true, type : 'longSMS' };
var msg = randomstring.generate(200);

sms = new Infobip(username, password);

sms.send(sender, msg, recipients, options, function(e, r){
	if (err) { return 'woopsie daisy'; }
	console.log(e, r);
});
```

#### Sending an sms in binary hex

```
var buffer = new Buffer('this message is binary hex');
var options = { binary : true };
var msg = buffer.toString('hex');

sms = new Infobip(username, password);

sms.send(sender, msg, recipients, options, function(e, r){
	if (err) { return 'woopsie daisy'; }
	console.log(e, r);
});
```

### Documents

See `/docs/Infobip_HTTP_API_and_SMPP_specification.pdf`