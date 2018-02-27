// Twilio Credentials
const accountSid = 'ACbfcfe0671517c4f8226c55dd4bd7b68d';
const authToken = '812e1da45c8b2be5131c15b626be1420';

// require the Twilio module and create a REST client
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
    to: '+17034980832',
    from: '+12408234215',
    body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
  })
  .then(message => console.log(message.sid));

