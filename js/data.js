'use strict';

(function () {
  var OFFERS_NUMBER = 5;

  var Properties = {
    TYPE_RU: {
      palace: 'Дворец',
      flat: 'Квартира',
      house: 'Дом',
      bungalo: 'Бунгало'
    },
    MIN_PRICE: {
      palace: 10000,
      flat: 1000,
      house: 5000,
      bungalo: 0
    },
    FEATURES_RU: {
      wifi: 'Беспроводной интернет',
      dishwasher: 'Посудомойка',
      parking: 'Парковка',
      washer: 'Стиральная машина',
      elevator: 'Лифт',
      conditioner: 'Кондиционер'
    }
  };

  var Amount = {
    ROOM: {
      MAX: 100,
      MIN: 1
    },
    GUEST: {
      MAX: 3,
      MIN: 1
    },
    PRICE: {
      MAX: 1000000
    }
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

  var generateTextRoomsAndGuests = function (rooms, guests) {
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

  window.data = {
    OFFERS_NUMBER: OFFERS_NUMBER,
    Properties: Properties,
    Amount: Amount,
    generateTextRoomsAndGuests: generateTextRoomsAndGuests,
    generatePhotos: generatePhotos
  };
})();
