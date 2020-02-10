'use strict';

(function () {
  // window.card.render();

  var activatePage = function () {
    window.map.activate();
    window.form.activate();
  };

  window.form.disable();

  window.pin.main.addEventListener('mousedown', function (e) {
    if (e.button === 0) {
      activatePage();
      var x = window.pin.getCoordinateX();
      var y = window.pin.getCoordinateY();
      window.form.setAddress(x, y);
    }
  });

  window.pin.main.addEventListener('keydown', function (evt) {
    if (evt.key === window.utils.ENTER_KEY) {
      activatePage();
      var x = window.pin.getCoordinateX();
      var y = window.pin.getCoordinateY();
      window.form.setAddress(x, y);
    }
  });

})();
