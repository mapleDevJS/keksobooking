'use strict';

(function () {
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

  var setAddress = function (x, y) {
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

  var resetForm = function (evt) {
    evt.preventDefault();
    form.reset();
    disable();
    window.map.disable();

    var pinCoordinates = {
      x: window.pin.getCoordinateX(window.pin.mainPin),
      y: window.pin.getCoordinateY(window.pin.mainPin)
    };


    window.pin.setPosition(window.pin.mainPin, window.pin.mainPinDefault.x, window.pin.mainPinDefault.y);

    setAddress(pinCoordinates.x, pinCoordinates.y);
  };

  resetButton.addEventListener('click', resetForm);
  resetButton.addEventListener('keydown', resetForm);

  // submitButton.addEventListener('click', function () {
  //   window.validation.validateRoomsCapacity(roomsNumber, guestsNumber);
  // });

  form.addEventListener('submit', function (evt) {
    window.backend.save(window.backend.serverUrl.POST, new FormData(form), onSuccess, onError);
    evt.preventDefault();
  });

  window.form = {
    disable: disable,
    activate: activate,
    setAddress: setAddress,
    submitButton: submitButton,
    roomsNumber: roomsNumber,
    guestsNumber: guestsNumber,
    numberOfRoomsSelect: numberOfRoomsSelect,
    numberOfGuestsSelect: numberOfGuestsSelect
  };
})();
