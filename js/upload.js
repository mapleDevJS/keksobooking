'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarChooser = document.querySelector('#avatar');
  var photoChooser = document.querySelector('#images');
  var avatarPreview = document.querySelector('.ad-form-header__preview');
  var photoPreview = document.querySelector('.ad-form__photo');
  var avatarImg = avatarPreview.querySelector('img');

  var photoImgElement = document.createElement('img');
  photoImgElement.style.width = '70px';
  photoImgElement.style.height = '70px';
  photoPreview.appendChild(photoImgElement);

  var photoImg = photoPreview.querySelector('img');

  var upload = function (fileChooser, img) {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        img.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  var onAvatarChooserChange = function () {
    upload(avatarChooser, avatarImg);
  };

  var onPhotoChooserChange = function () {
    upload(photoChooser, photoImg);
  };

  avatarChooser.addEventListener('change', onAvatarChooserChange);
  photoChooser.addEventListener('change', onPhotoChooserChange);
})();
