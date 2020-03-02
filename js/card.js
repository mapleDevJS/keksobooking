'use strict';

(function () {
  var template = document.querySelector('#card').content.querySelector('.map__card');
  var mapNode = document.querySelector('.map');
  var mapFiltersContainerNode = mapNode.querySelector('.map__filters-container');

  var createNode = function (node, property, value) {
    if (window.utils.isArrayEmpty(property)) {
      node.remove();
    } else {
      node.textContent = value;
    }
  };

  var create = function (ad) {
    var cardNode = template.cloneNode(true);
    var value;

    var titleNode = cardNode.querySelector('.popup__title');
    createNode(titleNode, ad.offer.title, ad.offer.title);

    var addressNode = cardNode.querySelector('.popup__text--address');
    createNode(addressNode, ad.offer.address, ad.offer.address);

    var priceNode = cardNode.querySelector('.popup__text--price');
    value = ad.offer.price + ' ₽/ночь';
    createNode(priceNode, ad.offer.price, value);

    var typeNode = cardNode.querySelector('.popup__type');
    value = window.data.Properties.TYPE_RU[ad.offer.type];
    createNode(typeNode, ad.offer.type, value);

    var capacityNode = cardNode.querySelector('.popup__text--capacity');
    value = window.data.generateTextRoomsAndGuests(ad.offer.rooms, ad.offer.guests);
    createNode(capacityNode, ad.offer.guests, value);

    var timeNode = cardNode.querySelector('.popup__text--time');
    value = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    createNode(timeNode, ad.offer.time, value);

    var featuresNode = cardNode.querySelector('.popup__features');
    value = window.data.Properties.FEATURES_RU[ad.offer.features];
    createNode(featuresNode, ad.offer.features, value);

    var descriptionNode = cardNode.querySelector('.popup__description');
    createNode(descriptionNode, ad.offer.description, ad.offer.description);

    var photosNode = cardNode.querySelector('.popup__photos');
    if (window.utils.isArrayEmpty(ad.offer.photos)) {
      photosNode.innerHTML = window.data.generatePhotos(ad.offer.photos);
    } else {
      photosNode.remove();
    }

    var avatarNode = cardNode.querySelector('.popup__avatar');
    createNode(avatarNode, ad.offer.avatar, ad.author.avatar);

    return cardNode;
  };

  var close = function () {
    var mapCardNode = document.querySelector('.map__card');
    if (mapCardNode) {
      mapCardNode.remove();
      window.pin.disable();
      document.removeEventListener('click', onContentClick);
      document.removeEventListener('keydown', onContentKeyDown);
    }
  };

  var onContentClick = function (evt) {
    var buttonCloseNode = document.querySelector('.popup__close');
    if (window.utils.Check.isMainButtonPressed(evt) && evt.target === buttonCloseNode) {
      close();
    }
  };

  var onContentKeyDown = function (evt) {
    if (window.utils.Check.isEscapePressed(evt)) {
      close();
    }
  };

  var render = function (offer) {
    var cardNode = create(offer);
    var mapCardNode = document.querySelector('.map__card');
    if (mapCardNode) {
      mapCardNode.remove();
    }
    mapNode.insertBefore(cardNode, mapFiltersContainerNode);
    document.addEventListener('click', onContentClick);
    document.addEventListener('keydown', onContentKeyDown);
  };

  window.card = {
    render: render,
    close: close
  };
})();
