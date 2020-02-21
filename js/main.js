'use strict';
(function () {

  var mainPin = document.querySelector('.map__pin--main');
  var pageActivated = false;

  var onMainButtonMouseDown = function (downEvt) {
    downEvt.preventDefault();

    if (downEvt.button === window.utils.key.MOUSE_MAIN) {

      if(!pageActivated) {
        window.map.activate();
        window.form.activate();
      };

      var mouseStartCoord = {
        x: downEvt.clientX,
        y: downEvt.clientY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: mouseStartCoord.x - moveEvt.clientX,
          y: mouseStartCoord.y - moveEvt.clientY
        };

        mouseStartCoord = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        var mainPinCoord = {
          x: mainPin.offsetLeft - shift.x,
          y: mainPin.offsetTop - shift.y
        };

        var leftBorder = -window.pin.offset.MAIN_PIN.X;
        mainPinCoord.x = (mainPinCoord.x < leftBorder) ? leftBorder : mainPinCoord.x;

        var rightBorder = window.map.WIDTH - window.pin.offset.MAIN_PIN.X;
        mainPinCoord.x = (mainPinCoord.x > rightBorder) ? rightBorder : mainPinCoord.x;

        var topBorder = window.map.TOP_Y - window.pin.offset.MAIN_PIN.Y;
        mainPinCoord.y = (mainPinCoord.y < topBorder) ? topBorder : mainPinCoord.y;

        var bottomBorder = window.map.BOTTOM_Y - window.pin.offset.MAIN_PIN.Y;
        mainPinCoord.y = (mainPinCoord.y > bottomBorder) ? bottomBorder : mainPinCoord.y;

        window.pin.setPositionOnMap(mainPin, mainPinCoord.x, mainPinCoord.y)
      };

      var onMainButtonMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMainButtonMouseUp);
        window.form.fillAddressInput();
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMainButtonMouseUp);

    }
  };

  var onEnterKeyDown = function (evt) {
    if (evt.key === window.utils.key.ENTER) {
      window.map.activate();
      window.form.activate();
      window.form.fillAddressInput();
    }
  };

  window.form.fillAddressInput();
  window.form.disable();
  window.pin.mainPin.addEventListener('mousedown', onMainButtonMouseDown);
  window.pin.mainPin.addEventListener('keydown', onEnterKeyDown);

  window.main = {
    pageActivated: pageActivated
  };

})();
