'use strict';

(function () {

  var WIDTH = 1200;
  var TOP = 130;
  var BOTTOM = 630;

  var limit = {
    TOP: TOP - window.pin.offset.MAIN_PIN.Y,
    RIGHT: WIDTH - window.pin.offset.MAIN_PIN.X,
    BOTTOM: BOTTOM - window.pin.offset.MAIN_PIN.Y,
    LEFT: -window.pin.offset.MAIN_PIN.X
  };

  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');

  var mainPinPosition = {
    DEFAULT: {
      x: mainPin.offsetLeft,
      y: mainPin.offsetTop
    }
  };

  var activate = function () {
    var onSuccess = function (data) {
      map.classList.remove('map--faded');
      window.offers = window.data.getListOfOffers(data);
      window.pin.render(window.offers);
    };

    var onError = function (errorText, status) {
      window.message.show(errorText, status);
      disable();
      window.form.disable();
      var errorButton = document.querySelector('.error__button');
      errorButton.addEventListener('click', window.message.close);
      document.addEventListener('click', window.message.close);
      document.addEventListener('keydown', window.message.close);
      window.main.pageActivated = false;
    };

    window.backend.load(window.backend.serverUrl.GET, onSuccess, onError);
  };

  var disable = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    window.pin.remove(pins);
    window.pin.setPositionOnMap(mainPin, mainPinPosition.DEFAULT.x, mainPinPosition.DEFAULT.y);
    map.classList.add('map--faded');
  };

  window.map = {
    limit: limit,
    activate: activate,
    disable: disable
  };
})();
