'use strict';

(function () {
  var template = document.querySelector('#card').content.querySelector('.map__card');
  var map = document.querySelector('.map');
  var mapFiltersContainer = map.querySelector('.map__filters-container');

  var create = function (advertisement) {
    var card = template.cloneNode(true);

    var title = card.querySelector('.popup__title').textContent = advertisement.offer.title;
    var address = card.querySelector('.popup__text--address').textContent = advertisement.offer.address;
    var price = card.querySelector('.popup__text--price').textContent = advertisement.offer.price + ' ₽/ночь';
    var type = card.querySelector('.popup__type').textContent = window.data.PROPERTIES_TYPE_RU[advertisement.offer.type];

    var capacity = card.querySelector('.popup__text--capacity');
    capacity.textContent = window.data.generateTextRoomsAndGuests(advertisement.offer.rooms, advertisement.offer.guests);

    var time = card.querySelector('.popup__text--time');
    time.textContent = 'Заезд после ' + advertisement.offer.checkin + ', выезд до ' + advertisement.offer.checkout;

    var features = card.querySelector('.popup__features');
    features.textContent = window.data.FEATURES_RU[advertisement.offer.features];

    var description = card.querySelector('.popup__description').textContent = advertisement.offer.description;

    var photos = card.querySelector('.popup__photos').innerHTML = advertisement.offer.photos;

    var avatar = card.querySelector('.popup__avatar').src = advertisement.author.avatar;

    return card;
  };

  // var offers = window.data.getListOfOffers();
  // var card = create(offers[0]);

  var render = function (evt, offer) {
    var card = create(offer);
    map.insertBefore(card, mapFiltersContainer);
  };

  window.card = {
    create: create,
    render: render
  };
})();
