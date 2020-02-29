'use strict';

(function () {
  var mapNode = document.querySelector('.map');

  var Sizes = {
    WIDTH: 1200,
    TOP: 130,
    BOTTOM: 630
  };

  var Limit = {
    TOP: Sizes.TOP - window.mainpin.Offset.Y,
    RIGHT: Sizes.WIDTH - window.mainpin.Offset.X,
    BOTTOM: Sizes.BOTTOM - window.mainpin.Offset.Y,
    LEFT: -window.mainpin.Offset.X
  };

  var activate = function () {
    mapNode.classList.remove('map--faded');
  };

  var disable = function () {
    var pinsNode = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    window.pin.remove(pinsNode);
    window.mainpin.reset();
    mapNode.classList.add('map--faded');
    window.filter.disable();
  };

  window.map = {
    Limit: Limit,
    activate: activate,
    disable: disable
  };
})();
