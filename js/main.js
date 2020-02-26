'use strict';
(function () {

  var pageActivated = false;

  var onMainButtonMouseDown = function (downEvt) {
    downEvt.preventDefault();

    if (downEvt.button === window.utils.key.MOUSE_MAIN) {
      if (!window.main.pageActivated) {
        window.map.activate();
        window.pin.render(window.offers);
        window.form.activate();
        window.main.pageActivated = true;
        window.pin.mainPin.removeEventListener('keydown', onEnterKeyDown);
      }

      window.dragndrop.activate(downEvt);
    }
  };

  var onEnterKeyDown = function (evt) {
    if (evt.key === window.utils.key.ENTER) {
      window.map.activate();
      window.form.activate();
      window.form.fillAddressInput();
    }
  };

  var onSuccess = function (data) {
    window.offers = data;
    window.pin.mainPin.addEventListener('mousedown', onMainButtonMouseDown);
    window.pin.mainPin.addEventListener('keydown', onEnterKeyDown);
  };

  var onErrorButtonClick = function (evt) {
    var errorButton = document.querySelector('.error__button');
    errorButton.removeEventListener('click', onErrorButtonClick);
    window.message.close(evt);
  };

  var onMainButtonClick = function (evt) {
    window.message.close(evt);
    document.removeEventListener('click', onMainButtonClick);
  };

  var onEscapeKeyDown = function (evt) {
    window.message.close(evt);
    document.removeEventListener('keydown', onEscapeKeyDown);
  };

  var onError = function (errorText, status) {
    window.message.show(errorText, status);
    var errorButton = document.querySelector('.error__button');
    errorButton.addEventListener('click', onErrorButtonClick);
    document.addEventListener('click', onMainButtonClick);
    document.addEventListener('keydown', onEscapeKeyDown);
  };

  window.backend.load(window.backend.serverUrl.GET, onSuccess, onError);
  window.form.fillAddressInput();
  window.form.disable();

  window.main = {
    pageActivated: pageActivated,
    onErrorButtonClick: onErrorButtonClick,
    onMainButtonClick: onMainButtonClick,
    onEscapeKeyDown: onEscapeKeyDown
  };

})();
