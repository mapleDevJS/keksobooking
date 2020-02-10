'use strict';

(function () {
  var notice = document.querySelector('.notice');
  var adForm = document.querySelector('.ad-form');
  var fieldsets = notice.querySelectorAll('fieldset');
  var inputs = adForm.querySelectorAll('input');
  var selects = adForm.querySelectorAll('select');
  var mapFilters = document.querySelector('.map__filters');
  var address = document.querySelector('#address');
  var numberOfRoomsSelect = notice.querySelector('#room_number');
  var numberOfGuestsSelect = notice.querySelector('#capacity');
  var roomsNumber = numberOfRoomsSelect.value;
  var guestsNumber = numberOfGuestsSelect.value;
  var submitButton = notice.querySelector('.ad-form__submit');

  var setAddress = function (x, y) {
    address.value = x + ', ' + y;
  };

  var disable = function () {
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].setAttribute('disabled', 'disabled');
    }
    for (i = 0; i < inputs.length; i++) {
      inputs[i].setAttribute('disabled', 'disabled');
    }
    for (i = 0; i < selects.length; i++) {
      selects[i].setAttribute('disabled', 'disabled');
    }
    mapFilters.setAttribute('disabled', 'disabled');
  };

  var activate = function () {
    adForm.classList.remove('ad-form--disabled');
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].removeAttribute('disabled');
    }
    for (i = 0; i < inputs.length; i++) {
      inputs[i].removeAttribute('disabled');
    }
    for (i = 0; i < selects.length; i++) {
      selects[i].removeAttribute('disabled');
    }
    mapFilters.removeAttribute('disabled');
  };

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
