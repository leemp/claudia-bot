'use strict';

var telegramTemplate = require('claudia-bot-builder').telegramTemplate;

module.exports = function(request, command, text) {

    // if (request.type === 'telegram')
    //     return new telegramTemplate.Text('Whats your favorite House in Game Of Thrones ' + request.text)
    //         .addReplyKeyboard([['Boo'], ['Moo']])
    //         .get();

    return text;

};