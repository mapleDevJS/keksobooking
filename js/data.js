'use strict';

(function () {
  var OFFERS_NUMBER = 8;
  var PROPERTIES_TYPE = [
    'palace',
    'flat',
    'house',
    'bungalo'
  ];

  var PROPERTIES_TYPE_RU = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  var AMOUNT = {
    ROOM: {
      MAX: 100,
      MIN: 1
    },
    GUEST: {
      MAX: 3,
      MIN: 1
    }
  };

  var CHECKIN_TIME = [
    '12:00',
    '13:00',
    '14:00'
  ];

  var CHECKOUT_TIME = [
    '12:00',
    '13:00',
    '14:00'
  ];

  var FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];

  var FEATURES_RU = {
    wifi: 'Беспроводной интернет',
    dishwasher: 'Посудомойка',
    parking: 'Парковка',
    washer: 'Стиральная машина',
    elevator: 'Лифт',
    conditioner: 'Кондиционер',
  };

  var PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  var generateFeatures = function () {
    var numberOfFeatures = window.utils.getRandomIntInclusive(1, window.data.FEATURES.length);
    var features = [];
    var feature = window.utils.getRandomElement(window.data.FEATURES);

    for (var i = 0; i < numberOfFeatures; i++) {

      while (features.includes(feature)) {
        feature = window.utils.getRandomElement(window.data.FEATURES);
      }

      features[i] = feature;
    }

    return features;
  };

  var getEndingsRooms = function (number) {
    if (number === 1) {
      return 'a';
    }
    return (number >= 2 && number <= 4) ? 'ы' : '';
  };

  var getEndingsGuests = function (number) {
    return number === 1 ? 'я' : 'ей';
  };

  var generateText = function (rooms, guests) {
    var endingWordRooms = getEndingsRooms(rooms);
    var endingWordGuests = getEndingsGuests(guests);

    var text = rooms + ' комнат' + endingWordRooms + ' для ' + guests + ' гост' + endingWordGuests;

    return text;
  };

  var generatePhotos = function (photos) {
    var imgTags = '';

    for (var i = 0; i < photos.length; i++) {
      imgTags += '<img src="' + photos[i] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">';
    }

    return imgTags;
  };

  var createOffer = function (offerNumber) {
    var locationX = window.utils.getRandomIntInclusive(0, window.map.MAP_WIDTH);
    var locationY = window.utils.getRandomIntInclusive(window.map.MAP_TOP_Y, window.map.MAP_BOTTOM_Y);
    var offer = {
      author: {
        avatar: 'img/avatars/user0' + (offerNumber + 1) + '.png'
      },
      offer: {
        title: 'строка, заголовок предложения',
        address: locationX + ', ' + locationY,
        price: 1000,
        type: window.utils.getRandomElement(window.data.PROPERTIES_TYPE),
        rooms: window.utils.getRandomIntInclusive(window.data.AMOUNT.ROOM.MIN, window.data.AMOUNT.ROOM.MAX),
        guests: window.utils.getRandomIntInclusive(window.data.AMOUNT.GUEST.MIN, window.data.AMOUNT.GUEST.MAX),
        checkin: window.utils.getRandomElement(window.data.CHECKIN_TIME),
        checkout: window.utils.getRandomElement(window.data.CHECKOUT_TIME),
        features: window.data.generateFeatures(),
        description: 'строка с описанием',
        photos: window.data.PHOTOS
      },
      location: {
        x: locationX,
        y: locationY
      }
    };
    return offer;
  };

  var getListOfOffers = function () {
    var offers = [];
    for (var i = 0; i < window.data.OFFERS_NUMBER; i++) {
      offers[i] = createOffer(i);
    }
    return offers;
  };

  window.data = {
    OFFERS_NUMBER: OFFERS_NUMBER,
    PROPERTIES_TYPE: PROPERTIES_TYPE,
    PROPERTIES_TYPE_RU: PROPERTIES_TYPE_RU,
    AMOUNT: AMOUNT,
    CHECKIN_TIME: CHECKIN_TIME,
    CHECKOUT_TIME: CHECKOUT_TIME,
    FEATURES: FEATURES,
    FEATURES_RU: FEATURES_RU,
    PHOTOS: PHOTOS,
    generateFeatures: generateFeatures,
    generateText: generateText,
    generatePhotos: generatePhotos,
    createOffer: createOffer,
    getListOfOffers: getListOfOffers
  };
})();
