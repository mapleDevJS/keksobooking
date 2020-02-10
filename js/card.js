'use strict';

(function () {
  var template = document.querySelector('#card').content.querySelector('.map__card');
  var map = document.querySelector('.map');
  var mapFiltersContainer = map.querySelector('.map__filters-container');

  var create = function (advertisement) {
    var card = template.cloneNode(true);

    var title = card.querySelector('.popup__title');
    title.textContent = advertisement.offer.title;

    var address = card.querySelector('.popup__text--address');
    address.textContent = advertisement.offer.address;

    var price = card.querySelector('.popup__text--price');
    price.textContent = advertisement.offer.price + ' ₽/ночь';

    var type = card.querySelector('.popup__type');

    // type.textContent = getPropertiesType(advertisement.offer.type);
    var offerType = [];
    offerType.push(advertisement.offer.type);
    type.textContent = window.utils.translateArray(offerType, window.data.PROPERTIES_TYPE_RU);

    var capacity = card.querySelector('.popup__text--capacity');
    var textRoomsAndGuests = window.data.generateText(advertisement.offer.rooms, advertisement.offer.guests);
    capacity.textContent = textRoomsAndGuests;

    var time = card.querySelector('.popup__text--time');
    time.textContent = 'Заезд после ' + advertisement.offer.checkin + ', выезд до ' + advertisement.offer.checkout;

    var features = card.querySelector('.popup__features');
    features.textContent = window.utils.translateArray(advertisement.offer.features, window.data.FEATURES_RU);

    var description = card.querySelector('.popup__description');
    description.textContent = advertisement.offer.description;

    var photos = card.querySelector('.popup__photos');
    photos.innerHTML = window.data.generatePhotos(advertisement.offer.photos);

    var avatar = card.querySelector('.popup__avatar');
    avatar.src = advertisement.author.avatar;

    return card;
  };

  var offers = window.data.getListOfOffers();
  var card = create(offers[0]);

  var render = function () {
    map.insertBefore(card, mapFiltersContainer);
  };

  window.card = {
    template: template,
    create: create,
    render: render,
    mapFiltersContainer: mapFiltersContainer
  };
})();
