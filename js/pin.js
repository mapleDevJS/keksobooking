'use strict';

(function () {
  var PX_CUT = 2;

  var OFFSET = {
    PIN: {
      X: 20,
      Y: 70
    },
    MAIN_PIN: {
      X: 31,
      Y: 84
    }
  };

  var mapPin = document.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var createPin = function (offer) {
    var pin = pinTemplate.cloneNode(true);
    var pinX = offer.location.x + OFFSET.PIN.X;
    var pinY = offer.location.y + OFFSET.PIN.Y;
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

  var remove = function (pins) {
    for (var i = 0; i < pins.length; i++) {
      pins[i].remove();
    }
  };

  var getPositionX = function (pin) {
    return parseInt(pin.style.left.slice(0, -PX_CUT), 10);
  };

  var getPositionY = function (pin) {
    return parseInt(pin.style.top.slice(0, -PX_CUT), 10);
  };

  var getCoordinateX = function (pin, offset) {
    return getPositionX(pin) + offset.X;
  };

  var getCoordinateY = function (pin, offset) {
    return getPositionY(pin) + offset.Y;
  };

  var mainPinDefault = {
    x: getPositionX(mainPin),
    y: getPositionY(mainPin)
  };

  var setPosition = function (pin, x, y) {
    pin.style.left = x + 'px';
    pin.style.top = y + 'px';
  };

  window.pin = {
    OFFSET: OFFSET,
    mainPin: mainPin,
    getCoordinateX: getCoordinateX,
    getCoordinateY: getCoordinateY,
    mainPinDefault: mainPinDefault,
    setPosition: setPosition,
    render: render,
    remove: remove
  };
})();
