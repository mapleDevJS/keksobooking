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

  var pinsContainer = document.querySelector('.map__pins');
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
    var pin = evt.target.closest('button[class=map__pin]');
    if (!pin) {
      return;
    }
    var index = pin.id;
    window.card.render(window.offers[index]);
  };

  var render = function (offers) {

    var fragment = document.createDocumentFragment();
    var lengthDiff = offers.length - window.data.OFFERS_NUMBER;
    var totalOffers;
    if (lengthDiff <= 0) {
      totalOffers = offers.length;
    } else {
      totalOffers = window.data.OFFERS_NUMBER;
    }

    if (totalOffers !== 0) {
      for (var j = 0; j < totalOffers; j++) {
        var pin = create(offers[j]);
        pin.setAttribute('id', j);
        fragment.appendChild(pin);
        pinsContainer.addEventListener('click', onPinClick);
        pinsContainer.appendChild(fragment);
      }
    }
  };

  var update = function (filterValue) {
    if (filterValue === 'any') {
      render(window.offers);
    } else {
      var filteredOffers = [];

      for (var i = 0; i < window.offers.length; i++) {
        if (window.offers[i].offer.type === filterValue) {
          filteredOffers.push(window.offers[i]);
        }
      }

      var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      remove(pins);
      render(filteredOffers);
    }

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
    update: update,
    remove: remove
  };
})();
