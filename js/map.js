'use strict';

(function () {

  var MAP_WIDTH = 1200;
  var MAP_TOP_Y = 130;
  var MAP_BOTTOM_Y = 630;

  var map = document.querySelector('.map');

  var activate = function () {
    window.map.map.classList.remove('map--faded');
    var offers = window.data.getListOfOffers();
    window.pin.render(offers);
  };

  window.map = {
    MAP_WIDTH: MAP_WIDTH,
    MAP_TOP_Y: MAP_TOP_Y,
    MAP_BOTTOM_Y: MAP_BOTTOM_Y,
    map: map,
    activate: activate
  };
})();
