'use strict';

(function () {
  var containerNode = document.querySelector('.map__pins');
  var templateNode = document.querySelector('#pin').content.querySelector('.map__pin');

  var Offset = {
    X: 20,
    Y: 70
  };

  var create = function (offer) {

    var pinNode = templateNode.cloneNode(true);
    var pinX = offer.location.x - Offset.X;
    var pinY = offer.location.y - Offset.Y;
    pinNode.style = 'left: ' + pinX + 'px; top: ' + pinY + 'px;';

    var avatarNode = pinNode.querySelector('img');
    avatarNode.src = offer.author.avatar;
    avatarNode.alt = offer.offer.title;

    return pinNode;
  };

  var onPinClick = function (evt) {
    var pinNode = evt.target.closest('.map__pin:not(.map__pin--main)');
    if (!pinNode) {
      return;
    }

    var activePinNode = containerNode.querySelector('.map__pin--active');
    if (activePinNode) {
      activePinNode.classList.remove('map__pin--active');
    }

    pinNode.classList.add('map__pin--active');
    window.card.render(window.offers[pinNode.id]);
  };

  var render = function (offers) {

    var fragment = document.createDocumentFragment();
    var diffAmountOfOffers = offers.length - window.data.OFFERS_NUMBER;
    var totalOffers = (diffAmountOfOffers <= 0) ? offers.length : window.data.OFFERS_NUMBER;

    if (totalOffers !== 0) {
      for (var j = 0; j < totalOffers; j++) {
        if (offers[j].offer) {
          var pinNode = create(offers[j]);
          pinNode.setAttribute('id', j);
          fragment.appendChild(pinNode);
        }
      }
      containerNode.addEventListener('click', onPinClick);
      containerNode.appendChild(fragment);
    }
  };

  var update = function (offers) {
    var pinsNode = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    window.card.close();
    remove(pinsNode);
    render(offers);
  };

  var remove = function (pins) {
    pins.forEach(function (item) {
      item.remove();
    });
    containerNode.removeEventListener('click', onPinClick);
  };

  var disable = function () {
    var activePinNode = containerNode.querySelector('.map__pin--active');
    if (activePinNode) {
      activePinNode.classList.remove('map__pin--active');
    }
  };

  var setPosition = function (pinNode, x, y) {
    pinNode.style.left = x + 'px';
    pinNode.style.top = y + 'px';
  };

  window.pin = {
    setPosition: setPosition,
    render: render,
    update: update,
    remove: remove,
    disable: disable
  };
})();
