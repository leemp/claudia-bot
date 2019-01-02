var botBuilder = require('claudia-bot-builder'),
    telegramTemplate = require('claudia-bot-builder').telegramTemplate,
    huify = require('./huify');

const supportedCommands = [ '/audio', '/quote', '/start', '/huify' ];

module.exports = botBuilder(function (request) {

    console.log('Request: ', JSON.stringify(request));

    if (request.type === 'telegram') {

        // there's a command, extract it
        if(request.originalRequest.message.entities) {
            var regExp = /^\/[^\s]+/g;
            var command = request.text.match(regExp)[0];
            var textAfterCommand = request.text.split(regExp)[1];

            if(supportedCommands.includes(command)) {
                var commandReq = require('.' + command);
                return commandReq(request, command, textAfterCommand);
            }

            return 'Command not found';
        }

        // process regular messages here
        return huify(request);

    }

});
