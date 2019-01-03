'use strict';

var telegramTemplate = require('claudia-bot-builder').telegramTemplate;

module.exports = function(request, command, text) {

  return new telegramTemplate.Text('Whats your favorite House in Game Of Thrones ' + request.text)
    // .addReplyKeyboard([['Boo'], ['Moo']])
    .get();

};
