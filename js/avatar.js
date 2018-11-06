'use strict';
// модуль avatar.js

(function () {

  window.avatar = {};

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];


  var fileChooserAvatarElement = document.querySelector('.ad-form__field input[type=file]');
  var previewAvatarElement = document.querySelector('.ad-form-header__preview').querySelector('img');
  var dropZoneAvatarElement = document.querySelector('.ad-form__field');

  var uploadFile = function (file) {

    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        previewAvatarElement.src = reader.result;
      });

      if (file) {
        reader.readAsDataURL(file);
      } else {
        previewAvatarElement.src = '';
      }
    }
  };

  fileChooserAvatarElement.addEventListener('change', function () {
    uploadFile(fileChooserAvatarElement.files[0]);
  });

  function dragenter(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  function dragover(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  function drop(e) {
    e.stopPropagation();
    e.preventDefault();

    var dt = e.dataTransfer;
    var files = dt.files;
    Array.from(files).forEach(uploadFile);

  }

  dropZoneAvatarElement.addEventListener('dragenter', dragenter, false);
  dropZoneAvatarElement.addEventListener('dragover', dragover, false);
  dropZoneAvatarElement.addEventListener('drop', drop, false);
