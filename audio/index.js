'use strict';

var tts = require('node-google-text-to-speech'),
    telegramTemplate = require('claudia-bot-builder').telegramTemplate;

module.exports = function(request, command, text) {

    // tts.translate('ru', 'привет как дела', function(result) {
    //     console.log(result);
    //     if(result.success) { //check for success
    //         var response = { 'audio' : result.data };
    //         return new telegramTemplate.Audio(response)
    //             .addTitle('Testing')
    //             .addPerformer('Shit')
    //             .get();
    //     }
    // });

    return command;

};