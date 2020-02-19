'use strict';
(function () {
  // window.card.render();
  var activatePage = function () {
    window.map.activate();
    window.form.activate();
  };

  var disablePage = function () {

  };

  window.form.disable();

  var onMouseDown = function (downEvt) {
    downEvt.preventDefault();
    if (downEvt.button === window.utils.KEY.MOUSE_LEFT) {
      activatePage();

      var pinCoordinates = {
        x: window.pin.getCoordinateX(window.pin.mainPin),
        y: window.pin.getCoordinateY(window.pin.mainPin)
      };

      var mouseStartCoordinates = {
        x: downEvt.clientX,
        y: downEvt.clientY
      };

      window.form.setAddress(pinCoordinates.x, pinCoordinates.y);

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: mouseStartCoordinates.x - moveEvt.clientX,
          y: mouseStartCoordinates.y - moveEvt.clientY
        };

        mouseStartCoordinates = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };


        pinCoordinates = {
          x: window.pin.mainPin.offsetLeft - shift.x,
          y: window.pin.mainPin.offsetTop - shift.y
        };

        var leftBorder = -window.pin.OFFSET.MAIN_PIN.X;
        pinCoordinates.x = (pinCoordinates.x < leftBorder) ? leftBorder : pinCoordinates.x;

        var rightBorder = window.map.WIDTH - window.pin.OFFSET.MAIN_PIN.X;
        pinCoordinates.x = (pinCoordinates.x > rightBorder) ? rightBorder : pinCoordinates.x;

        var topBorder = window.map.TOP_Y - window.pin.OFFSET.MAIN_PIN.Y;
        pinCoordinates.y = (pinCoordinates.y < topBorder) ? topBorder : pinCoordinates.y;

        var bottomBorder = window.map.BOTTOM_Y;
        pinCoordinates.y = (pinCoordinates.y > bottomBorder) ? bottomBorder : pinCoordinates.y;

        window.pin.mainPin.style.left = pinCoordinates.x + 'px';
        window.pin.mainPin.style.top = pinCoordinates.y + 'px';
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        window.form.setAddress(pinCoordinates.x, pinCoordinates.y);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);

    }
  };

  window.pin.mainPin.addEventListener('mousedown', onMouseDown);

  var onKeyDown = function (evt) {
    if (evt.key === window.utils.KEY.ENTER) {
      activatePage();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };
      window.form.setAddress(startCoords.x, startCoords.y);
    }
  };

  window.pin.mainPin.addEventListener('keydown', onKeyDown);

  window.main = {
    disablePage: disablePage
  };

})();
