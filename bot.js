var botBuilder = require('claudia-bot-builder'),
    telegramTemplate = require('claudia-bot-builder').telegramTemplate,
    huify = require('./huify'),
    mrp = require('minimal-request-promise');

const supportedCommands = ['start', 'berlin', 'budapest-party-reminder'];

module.exports = botBuilder(function (request, fullRequest) {

    console.log('Request: ', JSON.stringify(request));
    console.log('Full Request: ', JSON.stringify(fullRequest));

    if (request.type === 'telegram') {

        // there's a command, extract it
        if (request.originalRequest.message.entities) {
            // var regExp = /^\/[^\s]+/g;
            var regExp = /^\/([^@\s]+)@?(?:(\S+)|)\s?([\s\S]*)$/g;
            var command = request.text.split(regExp)[1];
            var botMention = request.text.split(regExp)[2];
            var textAfterCommand = request.text.split(regExp)[3];

            var botToken = fullRequest.env.telegramAccessToken;

            return mrp.get(`https://api.telegram.org/bot${botToken}/getMe`).then(function (response) {
                if (response.statusCode === 200) {

                    console.log("Bot info: ", JSON.stringify(response));
                    var responseBody = JSON.parse(response.body);

                    if (request.originalRequest.message.chat.type === 'private' ||
                        (botMention == responseBody.result.username)) {

                        if (supportedCommands.includes(command)) {
                            var commandReq = require('./' + command);
                            return commandReq(request, command, textAfterCommand);
                        }

                        return 'Command not found';
                    }
                }

            }).catch(function (reason) {
                console.log('Bot Info networking error: ', reason);
                return 'Whoopsie, your request failed to be processed!';
            });
        }

        // process regular messages here
        return huify(request);

    }

});
