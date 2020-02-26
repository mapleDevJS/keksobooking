'use strict';

(function () {
  var filters = document.querySelector('.map__filters');
  var selects = filters.querySelectorAll('.map__filter');
  var type = filters.querySelector('#housing-type');

  var disableSelect = function (item) {
    item.setAttribute('disabled', 'disabled');
  };

  var disable = function () {
    filters.setAttribute('disabled', 'disabled');
    selects.forEach(disableSelect);
  };

  var activate = function () {
    filters.removeAttribute('disabled');

    var activateSelect = function (item) {
      item.removeAttribute('disabled');
    };

    selects.forEach(activateSelect);
  };

  var onTypeChange = function () {
    window.card.close();
    window.pin.update(type.value);
  };

  type.addEventListener('change', onTypeChange);

  window.filter = {
    disable: disable,
    activate: activate
  };
})();
