'use strict';

(function () {
  var template = document.querySelector('#card').content.querySelector('.map__card');
  var map = document.querySelector('.map');
  var mapFiltersContainer = map.querySelector('.map__filters-container');

  var create = function (advertisement) {
    var card = template.cloneNode(true);

    card.querySelector('.popup__title').textContent = advertisement.offer.title;
    card.querySelector('.popup__text--address').textContent = advertisement.offer.address;
    card.querySelector('.popup__text--price').textContent = advertisement.offer.price + ' ₽/ночь';
    card.querySelector('.popup__type').textContent = window.data.PROPERTIES_TYPE_RU[advertisement.offer.type];

    var capacity = card.querySelector('.popup__text--capacity');
    capacity.textContent = window.data.generateTextRoomsAndGuests(advertisement.offer.rooms, advertisement.offer.guests);

    var time = card.querySelector('.popup__text--time');
    time.textContent = 'Заезд после ' + advertisement.offer.checkin + ', выезд до ' + advertisement.offer.checkout;

    var features = card.querySelector('.popup__features');
    features.textContent = window.data.FEATURES_RU[advertisement.offer.features];

    card.querySelector('.popup__description').textContent = advertisement.offer.description;
    card.querySelector('.popup__photos').innerHTML = window.data.generatePhotos(advertisement.offer.photos);
    card.querySelector('.popup__avatar').src = advertisement.author.avatar;

    return card;
  };

  var close = function () {
    var mapCard = document.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
      removeEventListener('click', onMainButtonClick);
      removeEventListener('keydown', onEscapeKeyDown);
    }
  };

  var onMainButtonClick = function (evt) {
    if (evt.button === window.utils.KeyCode.MOUSE_MAIN) {
      close();
    }
  };

  var onEscapeKeyDown = function (evt) {
    if (evt.KeyCode === window.utils.KeyCode.ESCAPE) {
      close();
    }
  };

  var render = function (offer) {
    var card = create(offer);
    var mapCard = document.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }
    map.insertBefore(card, mapFiltersContainer);
    var buttonClose = document.querySelector('.popup__close');
    buttonClose.addEventListener('click', onMainButtonClick);
    document.addEventListener('keydown', onEscapeKeyDown);
  };

  window.card = {
    render: render,
    close: close
  };
})();
