'use strict';

(function () {
  var mainPinNode = document.querySelector('.map__pin--main');
  var formNode = document.querySelector('.ad-form');
  var avatarChooserNode = document.querySelector('#avatar');
  var photoChooserNode = document.querySelector('#images');
  var avatarPreviewNode = document.querySelector('.ad-form-header__preview');
  var photoPreviewNode = document.querySelector('.ad-form__photo');
  var avatarImgNode = avatarPreviewNode.querySelector('img');
  var photoImgNode = photoPreviewNode.querySelector('img');
  var fieldsetsNode = formNode.querySelectorAll('fieldset');
  var addressNode = formNode.querySelector('#address');
  var resetButtonNode = formNode.querySelector('.ad-form__reset');

  var fillAddressInput = function () {
    if (window.isPageActivated) {
      var x = mainPinNode.offsetLeft + window.mainpin.Offset.X;
      var y = mainPinNode.offsetTop + window.mainpin.Offset.Y;
    } else {
      x = mainPinNode.offsetLeft + window.mainpin.Offset.X;
      y = mainPinNode.offsetTop + window.mainpin.Offset.Y / 2;
    }
    addressNode.value = x + ', ' + y;
  };

  var disable = function () {
    formNode.classList.add('ad-form--disabled');

    fieldsetsNode.forEach(function (node) {
      node.setAttribute('disabled', 'disabled');
      formNode.removeEventListener('submit', onFormSubmit);
    });

    window.validation.disable();
    addressNode.setAttribute('readonly', 'readonly');
  };

  var activate = function () {
    formNode.classList.remove('ad-form--disabled');

    fieldsetsNode.forEach(function (node) {
      node.removeAttribute('disabled');
    });

    avatarChooserNode.addEventListener('change', onAvatarChooserChange);
    photoChooserNode.addEventListener('change', onPhotoChooserChange);
    formNode.addEventListener('submit', onFormSubmit);
    formNode.addEventListener('click', onResetButtonClick);
    formNode.addEventListener('keydown', onResetButtonKeyDown);

    window.validation.activate();
    window.filter.activate();
  };

  var onError = function (errorText) {
    window.message.show(errorText, 'error');
    document.addEventListener('click', window.main.onContentClick);
    document.addEventListener('keydown', window.main.onContentKeyDown);
  };

  var onSuccess = function () {
    window.message.show('', 'success');
    document.addEventListener('click', window.main.onContentClick);
    document.addEventListener('keydown', window.main.onContentKeyDown);
    disable();
    window.map.disable();
    formNode.reset();
    window.isPageActivated = false;
  };

  var onResetButtonClick = function (evt) {
    if (window.utils.Check.isMainButtonPressed(evt) && evt.target === resetButtonNode) {
      evt.preventDefault();
      window.card.close();
      formNode.reset();
      disable();
      fillAddressInput();
      window.map.disable();
      window.isPageActivated = false;
    }
  };

  var onResetButtonKeyDown = function (evt) {
    if (window.utils.Check.isEnterPressed(evt) && evt.target === resetButtonNode) {
      onResetButtonClick();
    }
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    window.backend.save(window.backend.ServerUrl.POST, new FormData(formNode), onSuccess, onError);
  };

  var onAvatarChooserChange = function () {
    window.file.upload(avatarChooserNode, avatarImgNode);
  };

  var onPhotoChooserChange = function () {
    window.file.upload(photoChooserNode, photoImgNode);
  };

  window.form = {
    disable: disable,
    activate: activate,
    fillAddressInput: fillAddressInput
  };
})();
