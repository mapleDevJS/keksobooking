'use strict';

(function () {
  var KEY = {
    MOUSE_LEFT: 0,
    ENTER: 'Enter',
    ESCAPE: 'Escape'
  };

  var LENGTH_OF_SLICE = 2;

  var getRandomElement = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  var getMultipleRandomElements = function (array, n) {
    var originalArray = array;
    var modifiedArray = [];
    for (var i = 0; i < n; i++) {
      var element = getRandomElement(originalArray);
      modifiedArray.push(element);
      var index = originalArray.indexOf(element);
      originalArray.splice(index, 1);
    }

    return modifiedArray;
  };


  var getRandomIntInclusive = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var translateArray = function (words, dictionary) {
    var translatedString = '';

    for (var i = 0; i < words.length; i++) {
      translatedString += dictionary[words[i]] + ', ';
    }
    return translatedString.slice(0, -LENGTH_OF_SLICE);
  };

  window.utils = {
    KEY: KEY,
    getRandomElement: getRandomElement,
    getMultipleRandomElements: getMultipleRandomElements,
    getRandomIntInclusive: getRandomIntInclusive,
    translateArray: translateArray
  };
})();
