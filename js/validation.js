'use strict';

(function () {
  var formNode = document.querySelector('.ad-form');
  var titleNode = formNode.querySelector('#title');
  var typeNode = formNode.querySelector('#type');
  var priceNode = formNode.querySelector('#price');
  var timeinNode = formNode.querySelector('#timein');
  var timeoutNode = formNode.querySelector('#timeout');
  var roomsNumberNode = formNode.querySelector('#room_number');
  var guestsNumberNode = formNode.querySelector('#capacity');

  var avatarNode = document.querySelector('#avatar');
  var imagesNode = formNode.querySelector('#images');

  var inputFields = formNode.querySelectorAll('input');

  var TITLE_LENGTH = {
    MIN: 30,
    MAX: 100
  };

  var ErrorMessage = {
    1: '1 комната — «для 1 гостя»',
    2: '2 комнаты — «для 2 гостей» или «для 1 гостя»',
    3: '3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»',
    100: '100 комнат — «не для гостей»',
    TITLE: {
      BEGIN: 'Длина заголовка должна быть от ' + TITLE_LENGTH.MIN + ' до ' + TITLE_LENGTH.MAX + ' (вы ввели ',
      END: ' ).'
    },
    bungalo: '«Бунгало» — минимальная цена за ночь ' + window.data.Properties.MIN_PRICE.bungalo,
    flat: '«Квартира» — минимальная цена за ночь ' + window.data.Properties.MIN_PRICE.flat,
    house: '«Дом» — минимальная цена ' + window.data.Properties.MIN_PRICE.house,
    palace: '«Дворец» — минимальная цена ' + window.data.Properties.MIN_PRICE.palace
  };

  var highlightInput = function (input) {
    input.style.border = '2px solid tomato';
    input.style.boxShadow = 'none';
  };

  var resetHighlightInput = function (input) {
    input.style.border = '';
  };

  var resetHighlights = function () {
    inputFields.forEach(function (input) {
      input.style.border = '';
    });
  };

  var onTitleChange = function () {
    resetHighlightInput(titleNode);
    titleNode.setCustomValidity('');
    if (titleNode.value.length > TITLE_LENGTH.MAX || titleNode.value.length < TITLE_LENGTH.MIN) {
      titleNode.setCustomValidity(ErrorMessage.TITLE.BEGIN + titleNode.value.length + ErrorMessage.TITLE.END);
      highlightInput(titleNode);
    }
  };

  var onRoomOrGuestChange = function () {
    resetHighlightInput(guestsNumberNode);
    guestsNumberNode.setCustomValidity('');
    switch (roomsNumberNode.value) {
      case '1':
        if (guestsNumberNode.value !== '1') {
          guestsNumberNode.setCustomValidity(ErrorMessage[roomsNumberNode.value]);
          highlightInput(guestsNumberNode);
        }
        break;
      case '2':
        if (guestsNumberNode.value === '0' || guestsNumberNode.value === '3') {
          guestsNumberNode.setCustomValidity(ErrorMessage[roomsNumberNode.value]);
          highlightInput(guestsNumberNode);
        }
        break;
      case '3':
        if (guestsNumberNode.value === '0') {
          guestsNumberNode.setCustomValidity(ErrorMessage[roomsNumberNode.value]);
          highlightInput(guestsNumberNode);
        }
        break;
      case '100':
        if (guestsNumberNode.value !== '0') {
          guestsNumberNode.setCustomValidity(ErrorMessage[roomsNumberNode.value]);
          highlightInput(guestsNumberNode);
        }
        break;
    }
  };

  var onPriceChange = function () {
    resetHighlightInput(priceNode);
    priceNode.setCustomValidity('');
    priceNode.setAttribute('placeholder', window.data.Properties.MIN_PRICE[typeNode.value]);
    if (parseInt(priceNode.value, 10) < window.data.Properties.MIN_PRICE[typeNode.value]) {
      priceNode.setCustomValidity(ErrorMessage[typeNode.value]);
      highlightInput(priceNode);
    }
  };

  var onPriceInvalid = function () {
    onPriceChange();
  };

  var onTypeChange = function () {
    if (priceNode.value) {
      priceNode.value = null;
    }

    resetHighlightInput(priceNode);
    priceNode.setCustomValidity('');
    priceNode.setAttribute('placeholder', window.data.Properties.MIN_PRICE[typeNode.value]);
    if (parseInt(priceNode.value, 10) < window.data.Properties.MIN_PRICE[typeNode.value]) {
      priceNode.setCustomValidity(ErrorMessage[typeNode.value]);
      highlightInput(priceNode);
    }
  };

  var onTimeInChange = function () {
    if (parseInt(timeoutNode.value, 10) !== parseInt(timeinNode.value, 10)) {
      timeoutNode.value = timeinNode.value;
    }
  };

  var onTimeOutChange = function () {
    if (parseInt(timeinNode.value, 10) !== parseInt(timeoutNode.value, 10)) {
      timeinNode.value = timeoutNode.value;
    }
  };

  var activate = function () {
    titleNode.setAttribute('required', 'required');
    titleNode.setAttribute('minlength', window.validation.TITLE_LENGTH.MIN);
    titleNode.setAttribute('maxlength', window.validation.TITLE_LENGTH.MAX);
    priceNode.setAttribute('required', 'required');
    priceNode.setAttribute('max', window.data.Amount.PRICE.MAX);
    priceNode.setAttribute('placeholder', window.data.Properties.MIN_PRICE[typeNode.value]);
    imagesNode.setAttribute('accept', 'image/*');
    avatarNode.setAttribute('accept', 'image/*');

    titleNode.addEventListener('invalid', onTitleChange);
    typeNode.addEventListener('change', onTypeChange);
    priceNode.addEventListener('change', onPriceChange);
    priceNode.addEventListener('invalid', onPriceInvalid);
    timeinNode.addEventListener('change', onTimeInChange);
    timeoutNode.addEventListener('change', onTimeOutChange);
    roomsNumberNode.addEventListener('change', onRoomOrGuestChange);
    guestsNumberNode.addEventListener('change', onRoomOrGuestChange);
  };

  var disable = function () {
    titleNode.removeEventListener('invalid', onTitleChange);
    typeNode.removeEventListener('change', onTypeChange);
    priceNode.removeEventListener('change', onPriceChange);
    priceNode.removeEventListener('invalid', onPriceInvalid);
    timeinNode.removeEventListener('change', onTimeInChange);
    timeoutNode.removeEventListener('change', onTimeOutChange);
    roomsNumberNode.removeEventListener('change', onRoomOrGuestChange);
    guestsNumberNode.removeEventListener('change', onRoomOrGuestChange);
  };

  window.validation = {
    TITLE_LENGTH: TITLE_LENGTH,
    activate: activate,
    disable: disable,
    resetHighlights: resetHighlights
  };

})();
