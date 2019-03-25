'use strict';
const botBuilder = require('claudia-bot-builder'),
  telegramTemplate = botBuilder.telegramTemplate,
  GoogleImageSearch = require('./googleImageSearch.js');

module.exports = function(request, command, text) {

  new GoogleImageSearch("cats").then((res) => {
    console.log(res); // This will return array of image URLs
  });

  // Search for a random gif
  // gifImage.gifSearch.random('cat').then(
  //   gifUrl => console.log(gifUrl)
  // );

  return [
    'text'
  ];

};
