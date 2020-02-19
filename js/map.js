'use strict';

(function () {

  var WIDTH = 1200;
  var TOP_Y = 130;
  var BOTTOM_Y = 630;

  var map = document.querySelector('.map');

  var activate = function () {
    map.classList.remove('map--faded');

    var onSuccess = function (data) {
      var offers = window.data.getListOfOffers(data);
      // var card = window.card.create(offers[0]);
      window.pin.render(offers);
      // window.card.render(card);
    };

    var onError = function (errorMessage) {
      var node = document.createElement('div');
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '30px';

      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    };

    window.backend.load(window.backend.serverUrl.GET, onSuccess, onError);
  };

  var disable = function () {
    map.classList.add('map--faded');
  };

  window.map = {
    WIDTH: WIDTH,
    TOP_Y: TOP_Y,
    BOTTOM_Y: BOTTOM_Y,
    activate: activate,
    disable: disable
  };
})();
