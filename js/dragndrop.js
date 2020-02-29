'use strict';
(function () {
  var mainPinNode = document.querySelector('.map__pin--main');

  var activate = function (downEvt) {
    var mouseStartCoord = {
      x: downEvt.clientX,
      y: downEvt.clientY
    };

    var onContentMouseMove = function (moveEvt) {
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
        x: mainPinNode.offsetLeft - shift.x,
        y: mainPinNode.offsetTop - shift.y
      };

      mainPinCoord.x = (mainPinCoord.x < window.map.Limit.LEFT) ? window.map.Limit.LEFT : mainPinCoord.x;
      mainPinCoord.x = (mainPinCoord.x > window.map.Limit.RIGHT) ? window.map.Limit.RIGHT : mainPinCoord.x;
      mainPinCoord.y = (mainPinCoord.y < window.map.Limit.TOP) ? window.map.Limit.TOP : mainPinCoord.y;
      mainPinCoord.y = (mainPinCoord.y > window.map.Limit.BOTTOM) ? window.map.Limit.BOTTOM : mainPinCoord.y;

      window.pin.setPosition(mainPinNode, mainPinCoord.x, mainPinCoord.y);
    };

    var onContentMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onContentMouseMove);
      document.removeEventListener('mouseup', onContentMouseUp);
      window.form.fillAddressInput();
    };

    document.addEventListener('mousemove', onContentMouseMove);
    document.addEventListener('mouseup', onContentMouseUp);
  };

  window.dragndrop = {
    activate: activate
  };

})();
