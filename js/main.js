'use strict';
(function () {

  var mainPinNode = document.querySelector('.map__pin--main');
  window.isPageActivated = false;

  var activatePage = function () {
    window.map.activate();
    window.form.activate();
    window.isPageActivated = true;
    mainPinNode.removeEventListener('keydown', onMainPinKeyDown);
  };

  var onMainPinMouseDown = function (downEvt) {
    downEvt.preventDefault();

    if (window.utils.Check.isMainButtonPressed(downEvt)) {
      if (!window.isPageActivated) {
        activatePage();
        window.backend.request('GET', window.backend.ServerUrl.GET, '', onSuccess, onError);
      }
      window.dragndrop.activate(downEvt);
    }
  };

  var onMainPinKeyDown = function (evt) {
    if (window.utils.Check.isEnterPressed(evt)) {
      if (!window.isPageActivated) {
        activatePage();
        window.backend.request('GET', window.backend.ServerUrl.GET, '', onSuccess, onError);
      }
      window.dragndrop.activate(evt);
      window.form.fillAddressInput();
    }
  };

  var onSuccess = function (data) {
    window.offers = data;
    window.pin.render(window.offers);
  };

  var onContentClick = function (evt) {
    if (window.utils.Check.isMainButtonPressed(evt)) {
      window.message.close();
      document.removeEventListener('click', onContentClick);
    }
  };

  var onContentKeyDown = function (evt) {
    if (window.utils.Check.isEscapePressed(evt)) {
      window.message.close();
      document.removeEventListener('keydown', onContentKeyDown);
    }
  };

  var onError = function (errorText, status) {
    window.message.show(errorText, status);
    document.addEventListener('click', onContentClick);
    document.addEventListener('keydown', onContentKeyDown);
  };

  mainPinNode.addEventListener('mousedown', onMainPinMouseDown);
  mainPinNode.addEventListener('keydown', onMainPinKeyDown);
  window.form.fillAddressInput();
  window.form.disable();

  window.main = {
    onContentClick: onContentClick,
    onContentKeyDown: onContentKeyDown
  };

})();
