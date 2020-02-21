'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');
  var notice = document.querySelector('.notice');
  var form = notice.querySelector('.ad-form');
  var fieldsets = form.querySelectorAll('fieldset');
  var inputs = form.querySelectorAll('input');
  var selects = form.querySelectorAll('select');
  var mapFilters = document.querySelector('.map__filters');
  var address = form.querySelector('#address');
  var numberOfRoomsSelect = form.querySelector('#room_number');
  var numberOfGuestsSelect = form.querySelector('#capacity');
  var roomsNumber = numberOfRoomsSelect.value;
  var guestsNumber = numberOfGuestsSelect.value;
  var submitButton = form.querySelector('.ad-form__submit');
  var resetButton = form.querySelector('.ad-form__reset');

  var formElements = [
    fieldsets,
    inputs,
    selects
  ];

  var fillAddressInput = function () {
    var x = mainPin.offsetLeft + window.pin.offset.MAIN_PIN.X;
    var y = mainPin.offsetTop + window.pin.offset.MAIN_PIN.Y
    address.value = x + ', ' + y;
  };

  var disable = function () {
    form.classList.add('ad-form--disabled');
    for (var i = 0; i < formElements.length; i++) {
      var element = formElements[i];

      for (var j = 0; j < element.length; j++) {
        element[j].setAttribute('disabled', 'disabled');
      }
    }
    mapFilters.setAttribute('disabled', 'disabled');
  };

  var activate = function () {
    form.classList.remove('ad-form--disabled');
    for (var i = 0; i < formElements.length; i++) {
      var element = formElements[i];
      for (var j = 0; j < element.length; j++) {
        element[j].removeAttribute('disabled');
      }
    }
    mapFilters.removeAttribute('disabled');
  };

  var onError = function () {
    window.message.show('error');
    var errorButton = document.querySelector('.error__button');
    errorButton.addEventListener('click', window.message.close);
    document.addEventListener('click', window.message.close);
    document.addEventListener('keydown', window.message.close);
  };

  var onSuccess = function () {
    window.message.show('success');
    document.addEventListener('click', window.message.close);
    document.addEventListener('keydown', window.message.close);
    disable();
    window.map.disable();
    form.reset();
  };

  var onMouseClick = function (evt) {
    evt.preventDefault();
    form.reset();
    disable();
    window.map.disable();
    fillAddressInput();
    window.main.pageActivated = false;
    console.log(window.main.pageActivated);
  };

  var onEnterKeyDown = function (evt) {
    if (evt.key === window.utils.key.ENTER) {
      onMouseClick();
    }
  };

  resetButton.addEventListener('click', onMouseClick);
  resetButton.addEventListener('keydown', onEnterKeyDown);

  // submitButton.addEventListener('click', function () {
  //   window.validation.validateRoomsCapacity(roomsNumber, guestsNumber);
  // });

  var onFormSubmit = function (evt) {
    window.backend.save(window.backend.serverUrl.POST, new FormData(form), onSuccess, onError);
    evt.preventDefault();
  };

  form.addEventListener('submit', onFormSubmit);

  window.form = {
    disable: disable,
    activate: activate,
    fillAddressInput: fillAddressInput,
    submitButton: submitButton,
    roomsNumber: roomsNumber,
    guestsNumber: guestsNumber,
    numberOfRoomsSelect: numberOfRoomsSelect,
    numberOfGuestsSelect: numberOfGuestsSelect
  };
})();
