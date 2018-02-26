var botBuilder = require('claudia-bot-builder'),
    excuse = require('huh');

const telegramTemplate = require('claudia-bot-builder').telegramTemplate;

var tts = require('node-google-text-to-speech');

module.exports = botBuilder(function (request) {

    tts.translate('ru', 'привет как дела', function(result) {
        // console.log(result);
        if(result.success) { //check for success
            var response = { 'audio' : result.data };
            return new telegramTemplate.Audio(response)
                .addTitle('Testing')
                .addPerformer('Shit')
                .get();
        }
    });

    if (request.type === 'telegram')
        return new telegramTemplate.Text(`What's your favorite House in Game Of Thrones`)
            .addReplyKeyboard([['Stark'], ['Lannister'], ['Targaryen'], ['None of the above']])
            .get();

    return 'Thanks for sending ' + request.text  +
        '. Your message is very important to us, but ' +
        excuse.get();
});