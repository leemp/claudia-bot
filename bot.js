var botBuilder = require('claudia-bot-builder'),
    excuse = require('huh'),
    telegramTemplate = require('claudia-bot-builder').telegramTemplate;

var audio = require('./audio');
var quote = require('./quote');

module.exports = botBuilder(function (request) {

    console.log('Request: ', JSON.stringify(request));

    if (request.type === 'telegram') {

        // extract command
        if(request.originalRequest.message.entities.type) {
            var regExp = /^\/[^\s]+/g;
            var commandArr = regExp.exec(request.text);
            console.log(commandArr);
        }

        return quote(request);
    }

    // return audio(request);

    // if (request.type === 'telegram')
    //     return new telegramTemplate.Text('Whats your favorite House in Game Of Thrones')
    //         .addReplyKeyboard([['Stark'], ['Lannister'], ['Targaryen'], ['None of the above']])
    //         .get();
    //
    // return 'Thanks for sending ' + request.text  +
    //     '. Your message is very important to us, but ' +
    //     excuse.get();
});