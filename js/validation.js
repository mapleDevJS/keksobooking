'use strict';

(function () {

  var VALIDITY_TEXT = {
    1: '1 комната — «для 1 гостя»',
    2: '2 комнаты — «для 2 гостей» или «для 1 гостя»',
    3: '3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»',
    100: window.data.amount.ROOM.MAX + ' комнат — «не для гостей»'
  };

  var validateRoomsCapacity = function (rooms, guests) {

    if ((guests > rooms && rooms !== window.data.amount.ROOM.MAX) || (rooms !== window.data.amount.ROOM.MAX && guests === 0) || (rooms === 100 && guests > 0)) {
      window.form.numberOfGuestsSelect.setCustomValidity(VALIDITY_TEXT[rooms]);
      window.form.numberOfGuestsSelect.style.border = '1px solid red';
    } else {
      window.form.numberOfGuestsSelect.setCustomValidity('');
    }
  };

  window.form.numberOfRoomsSelect.addEventListener('change', function () {
    window.form.roomsNumber = parseInt(window.form.numberOfRoomsSelect.value, 10);
  });

  window.form.numberOfGuestsSelect.addEventListener('change', function () {
    window.form.guestsNumber = parseInt(window.form.numberOfGuestsSelect.value, 10);
    window.form.numberOfGuestsSelect.setCustomValidity('');
  });

  window.validation = {
    validateRoomsCapacity: validateRoomsCapacity
  };
})();
