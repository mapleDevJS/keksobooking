'use strict';

(function () {
  var Offset = {
    X: 31,
    Y: 84
  };

  var mainPinNode = document.querySelector('.map__pin--main');

  var Position = {
    DEFAULT: {
      x: mainPinNode.offsetLeft,
      y: mainPinNode.offsetTop
    }
  };

  var reset = function () {
    mainPinNode.style.left = Position.DEFAULT.x + 'px';
    mainPinNode.style.top = Position.DEFAULT.y + 'px';
  };

  window.mainpin = {
    Offset: Offset,
    reset: reset
  };
})();
