'use strict';

(function () {
  var pinsContainer = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var offset = {
    X: 20,
    Y: 70
  };

  var create = function (offer) {
    var pin = pinTemplate.cloneNode(true);
    var pinX = offer.location.x - offset.X;
    var pinY = offer.location.y - offset.Y;
    pin.style = 'left: ' + pinX + 'px; top: ' + pinY + 'px;';

    var avatar = pin.querySelector('img');
    avatar.src = offer.author.avatar;
    avatar.alt = offer.offer.title;

    return pin;
  };

  var onPinClick = function (evt) {
    var pin = evt.target.closest('button[class=map__pin]');
    if (!pin) {
      return;
    }
    window.card.render(window.offers[pin.id]);
  };

  var render = function (offers) {

    var fragment = document.createDocumentFragment();
    var diffAmountOfOffers = offers.length - window.data.OFFERS_NUMBER;
    var totalOffers = (diffAmountOfOffers <= 0) ? offers.length : window.data.OFFERS_NUMBER;

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

  var update = function (offers) {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    window.card.close();
    remove(pins);
    render(offers);
  };

  var remove = function (pins) {
    pins.forEach(function (item) {
      item.remove();
    });
    pinsContainer.removeEventListener('click', onPinClick);
  };

  var setPosition = function (pin, x, y) {
    pin.style.left = x + 'px';
    pin.style.top = y + 'px';
  };

  window.pin = {
    offset: offset,
    setPosition: setPosition,
    render: render,
    update: update,
    remove: remove
  };
})();
