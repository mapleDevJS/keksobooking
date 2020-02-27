'use strict';

(function () {
  var offset = {
    X: 31,
    Y: 84
  };

  var mainPin = document.querySelector('.map__pin--main');

  var position = {
    DEFAULT: {
      x: mainPin.offsetLeft,
      y: mainPin.offsetTop
    }
  };

  var reset = function () {
    mainPin.style.left = position.DEFAULT.x + 'px';
    mainPin.style.top = position.DEFAULT.y + 'px';
  };

  window.mainpin = {
    offset: offset,
    reset: reset
  };
})();
