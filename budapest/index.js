'use strict';
const botBuilder = require('claudia-bot-builder');
const telegramTemplate = botBuilder.telegramTemplate;

module.exports = function(request, command, text) {

  function countdown(endDate) {
    let days, hours, minutes, seconds;

    endDate = new Date(endDate).getTime();

    if (isNaN(endDate)) {
      return;
    }

    let startDate = new Date();
    startDate = startDate.getTime();

    let timeRemaining = parseInt((endDate - startDate) / 1000);

    if (timeRemaining >= 0) {
      days = parseInt(timeRemaining / 86400);
      timeRemaining = (timeRemaining % 86400);

      hours = parseInt(timeRemaining / 3600);
      timeRemaining = (timeRemaining % 3600);

      minutes = parseInt(timeRemaining / 60);
      timeRemaining = (timeRemaining % 60);

      seconds = parseInt(timeRemaining);

      let returnString;

      returnString = parseInt(days, 10) + " дней ";
      returnString += ("0" + hours).slice(-2) + " часов ";
      // returnString += "\nМинут: " + ("0" + minutes).slice(-2);
      // returnString += "\n Seconds: " + ("0" + seconds).slice(-2);

      return returnString;
    } else {
      return;
    }
  }

  return [
    new telegramTemplate.ChatAction('typing').get(),
    new telegramTemplate.Pause(400).get(),
    'Вычисляю время до начала ВЕЛИКОГО КУТЕЖА в БУДАПЕШТЕ (10 апреля 2019)...',
    new telegramTemplate.ChatAction('typing').get(),
    new telegramTemplate.Pause(800).get(),
    'До начала ВЕЛИЧАЙШЕГО ПРАЗДНИКА осталось:\n' + countdown('04/10/2019 12:00:00 PM'),
    new telegramTemplate.Location(47.494665, 19.052894).get()
  ];

};
