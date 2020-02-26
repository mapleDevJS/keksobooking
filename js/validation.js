'use strict';

(function () {

  var validityText = {
    1: '1 комната — «для 1 гостя»',
    2: '2 комнаты — «для 2 гостей» или «для 1 гостя»',
    3: '3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»',
    100: window.data.amount.ROOM.MAX + ' комнат — «не для гостей»',
    empty: 'test',
    bungalo: '«Бунгало» — минимальная цена за ночь ' + window.data.PROPERTIES_MIN_PRICE.bungalo,
    flat: '«Квартира» — минимальная цена за ночь ' + window.data.PROPERTIES_MIN_PRICE.flat,
    house: '«Дом» — минимальная цена ' + window.data.PROPERTIES_MIN_PRICE.house,
    palace: '«Дворец» — минимальная цена ' + window.data.PROPERTIES_MIN_PRICE.palace
  };

  window.validation = {
    validityText: validityText
  };

})();
