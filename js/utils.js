'use strict';

(function () {
  var KeyCode = {
    ENTER: 13,
    ESCAPE: 27
  };

  var ButtonCode = {
    MOUSE_MAIN: 0,
  };

  var Check = {
    isEnterPressed: function (evt) {
      return evt.keyCode === KeyCode.ENTER;
    },
    isEscapePressed: function (evt) {
      return evt.keyCode === KeyCode.ESCAPE;
    },
    isMainButtonPressed: function (evt) {
      return evt.button === ButtonCode.MOUSE_MAIN;
    }
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

  var isArrayEmpty = function (array) {
    return (Array.isArray(array) && array.length);
  };

  window.utils = {
    KeyCode: KeyCode,
    ButtonCode: ButtonCode,
    Check: Check,
    getMultipleRandomElements: getMultipleRandomElements,
    isArrayEmpty: isArrayEmpty
  };
})();
