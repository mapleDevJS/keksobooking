'use strict';

(function () {
  var offset = {
    PIN: {
      X: 20,
      Y: 70
    },
    MAIN_PIN: {
      X: 31,
      Y: 84
    }
  };

  var mapPins = document.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var create = function (offer) {
    var pin = pinTemplate.cloneNode(true);
    var pinX = offer.location.x + offset.PIN.X;
    var pinY = offer.location.y + offset.PIN.Y;
    pin.style = 'left: ' + pinX + 'px; top: ' + pinY + 'px;';

    var pinAvatar = pin.querySelector('img');
    pinAvatar.src = offer.author.avatar;
    pinAvatar.alt = offer.offer.title;

    return pin;
  };

  var onPinClick = function (evt) {
    if (evt.target.id) {
      var index = evt.target.id;
    } else {
      index = evt.target.closest('button').id;
    }

    window.card.render(window.offers[index]);
  };

  var render = function (offers) {
    var fragment = document.createDocumentFragment();
    for (var j = 0; j < offers.length; j++) {
      var pin = create(offers[j]);
      pin.setAttribute('id', j);
      // pin.firstChild.setAttribute('id', j);
      fragment.appendChild(pin);
      pin.addEventListener('click', onPinClick);
      // pin.firstChild.addEventListener('click', onPinClick);
    }
    // mapPins.addEventListener('click', onPinClick);
    mapPins.appendChild(fragment);
  };

  var remove = function (pins) {
    for (var i = 0; i < pins.length; i++) {
      pins[i].remove();
    }
  };


  var setPositionOnMap = function (pin, x, y) {
    pin.style.left = x + 'px';
    pin.style.top = y + 'px';
  };

  window.pin = {
    offset: offset,
    mainPin: mainPin,
    // mainPinDefault: mainPinDefault,
    setPositionOnMap: setPositionOnMap,
    render: render,
    remove: remove
  };
})();
