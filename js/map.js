'use strict';

(function () {

  var WIDTH = 1200;
  var TOP_Y = 130;
  var BOTTOM_Y = 630;

  var map = document.querySelector('.map');

  var activate = function () {
    map.classList.remove('map--faded');

    window.pin.render(window.card.offers);
  };

  window.map = {
    WIDTH: WIDTH,
    TOP_Y: TOP_Y,
    BOTTOM_Y: BOTTOM_Y,
    activate: activate
  };
})();
