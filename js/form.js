'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');
  var notice = document.querySelector('.notice');
  var form = notice.querySelector('.ad-form');
  var fieldsets = form.querySelectorAll('fieldset');
  var inputs = form.querySelectorAll('input');
  var selects = form.querySelectorAll('select');
  var avatar = document.querySelector('#avatar');
  var address = form.querySelector('#address');
  var title = form.querySelector('#title');
  var type = form.querySelector('#type');
  var price = form.querySelector('#price');
  var timein = form.querySelector('#timein');
  var timeout = form.querySelector('#timeout');
  var roomsNumber = form.querySelector('#room_number');
  var guestsNumber = form.querySelector('#capacity');
  var images = form.querySelector('#images');
  var resetButton = form.querySelector('.ad-form__reset');

  var formElements = [
    fieldsets,
    inputs,
    selects
  ];

  var fillAddressInput = function () {
    var x = mainPin.offsetLeft + window.mainpin.offset.X;
    var y = mainPin.offsetTop + window.mainpin.offset.Y;
    address.value = x + ', ' + y;
  };

  var disable = function () {
    form.classList.add('ad-form--disabled');

    formElements.forEach(function (element) {
      element.forEach(function (item) {
        item.setAttribute('disabled', 'disabled');
      });
    });

    window.filter.disable();
    address.setAttribute('readonly', 'readonly');
  };

  var activate = function () {
    form.classList.remove('ad-form--disabled');

    formElements.forEach(function (element) {
      element.forEach(function (item) {
        item.removeAttribute('disabled');
      });
    });

    window.filter.activate();
    title.setAttribute('required', 'required');
    title.setAttribute('minlength', window.data.amount.TITLE.MIN);
    title.setAttribute('maxlength', window.data.amount.TITLE.MAX);
    price.setAttribute('required', 'required');
    price.setAttribute('max', window.data.amount.PRICE.MAX);
    price.setAttribute('placeholder', window.data.PROPERTIES_MIN_PRICE[type.value]);
    images.setAttribute('accept', 'image/*');
    avatar.setAttribute('accept', 'image/*');
  };

  var onError = function (errorText) {
    window.message.show(errorText, 'error');
    document.addEventListener('click', window.main.onMainButtonClick);
    document.addEventListener('keydown', window.main.onEscapeKeyDown);
  };

  var onSuccess = function () {
    window.message.show('', 'success');
    document.addEventListener('click', window.main.onMainButtonClick);
    document.addEventListener('keydown', window.main.onEscapeKeyDown);
    disable();
    window.map.disable();
    form.reset();
    window.main.pageActivated = false;
  };

  var onMainMouseButtonClick = function (evt) {
    if (evt.button === window.utils.KeyCode.MOUSE_MAIN) {
      evt.preventDefault();
      window.card.close();
      form.reset();
      disable();
      fillAddressInput();
      window.map.disable();
      window.main.pageActivated = false;
    }
  };

  var onEnterKeyDown = function (evt) {
    if (evt.KeyCode === window.utils.KeyCode.ENTER) {
      onMainMouseButtonClick();
    }
  };

  resetButton.addEventListener('click', onMainMouseButtonClick);
  resetButton.addEventListener('keydown', onEnterKeyDown);

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    window.backend.save(window.backend.ServerUrl.POST, new FormData(form), onSuccess, onError);
  };

  var onRoomOrGuestChange = function () {
    guestsNumber.setCustomValidity('');
    switch (roomsNumber.value) {
      case '1':
        if (guestsNumber.value !== '1') {
          guestsNumber.setCustomValidity(window.validation.message[roomsNumber.value]);
        }
        break;
      case '2':
        if (guestsNumber.value === '0' || guestsNumber.value === '3') {
          guestsNumber.setCustomValidity(window.validation.message[roomsNumber.value]);
        }
        break;
      case '3':
        if (guestsNumber.value === '0') {
          guestsNumber.setCustomValidity(window.validation.message[roomsNumber.value]);
        }
        break;
      case '100':
        if (guestsNumber.value !== '0') {
          guestsNumber.setCustomValidity(window.validation.message[roomsNumber.value]);
        }
        break;
    }
  };

  var onTypeOrPriceChange = function () {
    price.setCustomValidity('');
    price.setAttribute('placeholder', window.data.PROPERTIES_MIN_PRICE[type.value]);
    if (parseInt(price.value, 10) < window.data.PROPERTIES_MIN_PRICE[type.value]) {
      price.setCustomValidity(window.validation.message[type.value]);
    }
  };

  var onTimeInChange = function () {
    if (parseInt(timeout.value, 10) !== parseInt(timein.value, 10)) {
      timeout.value = timein.value;
    }
  };

  var onTimeOutChange = function () {
    if (parseInt(timein.value, 10) !== parseInt(timeout.value, 10)) {
      timein.value = timeout.value;
    }
  };

  type.addEventListener('change', onTypeOrPriceChange);
  price.addEventListener('change', onTypeOrPriceChange);
  timein.addEventListener('change', onTimeInChange);
  timeout.addEventListener('change', onTimeOutChange);
  roomsNumber.addEventListener('change', onRoomOrGuestChange);
  guestsNumber.addEventListener('change', onRoomOrGuestChange);
  form.addEventListener('submit', onFormSubmit);

  window.form = {
    disable: disable,
    activate: activate,
    fillAddressInput: fillAddressInput
  };
})();
