'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var photoPreviewNode = document.querySelector('.ad-form__photo');
  var photoImgNode = document.createElement('img');
  photoImgNode.style.width = '70px';
  photoImgNode.style.height = '70px';
  photoPreviewNode.appendChild(photoImgNode);

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

  window.file = {
    upload: upload
  };
})();
