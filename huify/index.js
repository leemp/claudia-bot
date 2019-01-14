'use strict';

var telegramTemplate = require('claudia-bot-builder').telegramTemplate;

module.exports = function (request) {

    if (request.text.length > 0) {

        const consonants = 'бвгджзклмнпрстфхцчшщьъ'
        const vowels = {
            а: 'я',
            е: 'е',
            ё: 'ё',
            и: 'и',
            о: 'е',
            у: 'ю',
            э: 'е',
            ю: 'ю',
            я: 'я',
            ы: 'и',
        }

        const text = request.text
            .replace(/(\r\n|\n|\r)/gm, ' ')
            .trim()
            .toLowerCase()

        const arrayOfWords = text.split(' ')
        const words = []
        let responseFlag = false

        if (arrayOfWords.length < 3) {
            arrayOfWords.forEach(function (word) {

                if (/^[a-zA-Zа-яА-Я]+$/.test(word)) { // check if all characters are letters
                    if ((Math.floor(Math.random() * 6) + 1) > 4) { // (between 1 and 6) > 4 # means will work approx every third time
                        responseFlag = true
                        if (word.length > 2) {
                            while (~consonants.indexOf(word[0])) {
                                word = word.substr(1)
                            }
                            word = 'ху' + vowels[word[0]] + word.substr(1)
                        }
                    }
                }

                words.push(word)
            })

            if (responseFlag === true) {
                let from = ''
                if (request.originalRequest.message.from.username) {
                    from = request.originalRequest.message.from.username
                } else {
                    from = '[' + request.originalRequest.message.first_name + '](tg://user?id=' + request.originalRequest.message.from.id + ')'
                }

                return new telegramTemplate.Text('@' + from + ' ' + words.join(' ')).get()
            }

        }

    }

};
