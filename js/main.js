'use strict';
(function () {
  // window.card.render();
  var activatePage = function () {
    window.map.activate();
    window.form.activate();
  };

  window.form.disable();

  var mainPin = document.querySelector('.map__pin--main');

  var onMouseDown = function (downEvt) {
    downEvt.preventDefault();
    if (downEvt.button === window.utils.KEY.MOUSE_LEFT) {
      activatePage();

      var pinCoordinates = {
        x: window.pin.getCoordinateX(mainPin),
        y: window.pin.getCoordinateY(mainPin)
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
          x: mainPin.offsetLeft - shift.x,
          y: mainPin.offsetTop - shift.y
        };

        var leftBorder = -window.pin.OFFSET.MAIN_PIN.X;
        pinCoordinates.x = (pinCoordinates.x < leftBorder) ? leftBorder : pinCoordinates.x;

        var rightBorder = window.map.WIDTH - window.pin.OFFSET.MAIN_PIN.X;
        pinCoordinates.x = (pinCoordinates.x > rightBorder) ? rightBorder : pinCoordinates.x;

        var topBorder = window.map.TOP_Y - window.pin.OFFSET.MAIN_PIN.Y;
        pinCoordinates.y = (pinCoordinates.y < topBorder) ? topBorder : pinCoordinates.y;

        var bottomBorder = window.map.BOTTOM_Y;
        pinCoordinates.y = (pinCoordinates.y > bottomBorder) ? bottomBorder : pinCoordinates.y;

        mainPin.style.left = pinCoordinates.x + 'px';
        mainPin.style.top = pinCoordinates.y + 'px';
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

  mainPin.addEventListener('mousedown', onMouseDown);

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

  mainPin.addEventListener('keydown', onKeyDown);

})();
