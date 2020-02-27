'use strict';

(function () {
  var keyCode = {
    MOUSE_MAIN: 0,
    ENTER: 13,
    ESCAPE: 27
  };

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

  window.utils = {
    keyCode: keyCode,
    getRandomElement: getRandomElement,
    getMultipleRandomElements: getMultipleRandomElements
  };
})();
