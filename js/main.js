'use strict';
(function () {
  var mainPinCoord = {
    x: window.pin.getCoordinateX(window.pin.mainPin, window.pin.offset.MAIN_PIN.X),
    y: window.pin.getCoordinateY(window.pin.mainPin, window.pin.offset.MAIN_PIN.Y)
  };
  window.form.setAddress(mainPinCoord.x, mainPinCoord.y);
  window.form.disable();

  var onMouseDown = function (downEvt) {
    downEvt.preventDefault();
    if (downEvt.button === window.utils.key.MOUSE_LEFT) {
      window.map.activate();
      window.form.activate();

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


        mainPinCoord = {
          x: window.pin.mainPin.offsetLeft - shift.x,
          y: window.pin.mainPin.offsetTop - shift.y
        };

        var leftBorder = -window.pin.offset.MAIN_PIN.X;
        mainPinCoord.x = (mainPinCoord.x < leftBorder) ? leftBorder : mainPinCoord.x;

        var rightBorder = window.map.WIDTH - window.pin.offset.MAIN_PIN.X;
        mainPinCoord.x = (mainPinCoord.x > rightBorder) ? rightBorder : mainPinCoord.x;

        var topBorder = window.map.TOP_Y - window.pin.offset.MAIN_PIN.Y;
        mainPinCoord.y = (mainPinCoord.y < topBorder) ? topBorder : mainPinCoord.y;

        var bottomBorder = window.map.BOTTOM_Y - window.pin.offset.MAIN_PIN.Y;
        mainPinCoord.y = (mainPinCoord.y > bottomBorder) ? bottomBorder : mainPinCoord.y;

        window.pin.mainPin.style.left = mainPinCoord.x + 'px';
        window.pin.mainPin.style.top = mainPinCoord.y + 'px';
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        mainPinCoord = {
          x: window.pin.getCoordinateX(window.pin.mainPin, window.pin.offset.MAIN_PIN.X),
          y: window.pin.getCoordinateY(window.pin.mainPin, window.pin.offset.MAIN_PIN.Y)
        };

        window.form.setAddress(mainPinCoord.x, mainPinCoord.y);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);

    }
  };

  window.pin.mainPin.addEventListener('mousedown', onMouseDown);

  var onKeyDown = function (evt) {
    if (evt.key === window.utils.key.ENTER) {
      window.map.activate();
      window.form.activate();

      mainPinCoord = {
        x: window.pin.getCoordinateX(window.pin.mainPin, window.pin.offset.MAIN_PIN.X),
        y: window.pin.getCoordinateY(window.pin.mainPin, window.pin.offset.MAIN_PIN.Y)
      };

      window.form.setAddress(mainPinCoord.x, mainPinCoord.y);
    }
  };

  window.pin.mainPin.addEventListener('keydown', onKeyDown);

})();
