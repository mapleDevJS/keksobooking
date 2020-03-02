'use strict';

(function () {
  var template = document.querySelector('#card').content.querySelector('.map__card');
  var mapNode = document.querySelector('.map');
  var mapFiltersContainerNode = mapNode.querySelector('.map__filters-container');

  var create = function (ad) {
    var cardNode = template.cloneNode(true);

    var titleNode = cardNode.querySelector('.popup__title');
    if (window.utils.isArrayEmpty(ad.offer.title)) {
      titleNode.remove();
    } else {
      titleNode.textContent = ad.offer.title;
    }

    var addressNode = cardNode.querySelector('.popup__text--address');
    if (window.utils.isArrayEmpty(ad.offer.address)) {
      addressNode.remove();
    } else {
      addressNode.textContent = ad.offer.address;
    }

    var priceNode = cardNode.querySelector('.popup__text--price');
    if (window.utils.isArrayEmpty(ad.offer.price)) {
      priceNode.remove();
    } else {
      priceNode.textContent = ad.offer.price + ' ₽/ночь';
    }

    var typeNode = cardNode.querySelector('.popup__type');
    if (window.utils.isArrayEmpty(ad.offer.type)) {
      typeNode.remove();
    } else {
      typeNode.textContent = window.data.Properties.TYPE_RU[ad.offer.type];
    }

    var capacityNode = cardNode.querySelector('.popup__text--capacity');
    if (window.utils.isArrayEmpty(ad.offer.capacity)) {
      capacityNode.remove();
    } else {
      capacityNode.textContent = window.data.Properties.TYPE_RU[ad.offer.type];
    }

    var timeNode = cardNode.querySelector('.popup__text--time');
    if (window.utils.isArrayEmpty(ad.offer.time)) {
      timeNode.remove();
    } else {
      timeNode.textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    }

    var featuresNode = cardNode.querySelector('.popup__features');
    if (window.utils.isArrayEmpty(ad.offer.features)) {
      featuresNode.remove();
    } else {
      featuresNode.textContent = window.data.Properties.FEATURES_RU[ad.offer.features];
    }

    var descriptionNode = cardNode.querySelector('.popup__description');
    if (window.utils.isArrayEmpty(ad.offer.description)) {
      descriptionNode.remove();
    } else {
      descriptionNode.textContent = ad.offer.description;
    }

    var photosNode = cardNode.querySelector('.popup__photos');
    if (window.utils.isArrayEmpty(ad.offer.photos)) {
      photosNode.innerHTML = window.data.generatePhotos(ad.offer.photos);
    } else {
      photosNode.remove();
    }

    var avatarNode = cardNode.querySelector('.popup__avatar');
    if (window.utils.isArrayEmpty(ad.author.avatar)) {
      avatarNode.remove();
    } else {
      avatarNode.src = ad.author.avatar;
    }

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
