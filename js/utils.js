'use strict';

(function () {
  var ENTER_KEY = 'Enter';

  var getRandomElement = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };


  var getRandomIntInclusive = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var LENGTH_OF_SLICE = 2;

  var translateArray = function (words, dictionary) {
    var translatedString = '';

    for (var i = 0; i < words.length; i++) {
      translatedString += dictionary[words[i]] + ', ';
    }
    return translatedString.slice(0, -LENGTH_OF_SLICE);
  };

  window.utils = {
    ENTER_KEY: ENTER_KEY,
    getRandomElement: getRandomElement,
    getRandomIntInclusive: getRandomIntInclusive,
    translateArray: translateArray
  };
})();
