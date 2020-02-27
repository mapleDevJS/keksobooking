'use strict';

(function () {
  var map = document.querySelector('.map');

  var sizes = {
    WIDTH: 1200,
    TOP: 130,
    BOTTOM: 630
  };

  var limit = {
    TOP: sizes.TOP - window.mainpin.offset.Y,
    RIGHT: sizes.WIDTH - window.mainpin.offset.X,
    BOTTOM: sizes.BOTTOM - window.mainpin.offset.Y,
    LEFT: -window.mainpin.offset.X
  };

  var activate = function () {
    map.classList.remove('map--faded');
  };

  var disable = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    window.pin.remove(pins);
    window.mainpin.reset();
    map.classList.add('map--faded');
  };

  window.map = {
    limit: limit,
    activate: activate,
    disable: disable
  };
})();
