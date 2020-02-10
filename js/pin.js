'use strict';

(function () {
  var PX_CUT = -2;
  var PIN_OFFSET_X = -25;
  var PIN_OFFSET_Y = -35;

  var mapPin = document.querySelector('.map__pins');
  var main = document.querySelector('.map__pin--main');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var createPin = function (offer) {
    var pin = pinTemplate.cloneNode(true);
    var pinX = offer.location.x + PIN_OFFSET_X;
    var pinY = offer.location.y + PIN_OFFSET_Y;
    pin.style = 'left: ' + pinX + 'px; top: ' + pinY + 'px;';

    var pinAvatar = pin.querySelector('img');
    pinAvatar.src = offer.author.avatar;
    pinAvatar.alt = offer.offer.title;

    return pin;
  };

  var render = function (offers) {
    var fragment = document.createDocumentFragment();
    for (var j = 0; j < offers.length; j++) {
      fragment.appendChild(createPin(offers[j]));
    }
    mapPin.appendChild(fragment);
  };

  var getCoordinateX = function () {
    return main.style.left.slice(0, PX_CUT) - PIN_OFFSET_Y;
  };

  var getCoordinateY = function () {
    return main.style.top.slice(0, PX_CUT) - PIN_OFFSET_X;
  };


  window.pin = {
    main: main,
    render: render,
    getCoordinateX: getCoordinateX,
    getCoordinateY: getCoordinateY
  };
})();
