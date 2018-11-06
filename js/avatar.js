'use strict';
// модуль avatar.js

(function () {

  window.avatar = {};

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];


  var fileChooser = document.querySelector('.ad-form__field input[type=file]');
  var preview = document.querySelector('.ad-form-header__preview').querySelector('img');
  var dropZoneElement = document.querySelector('.ad-form-header__drop-zone');

  var uploadFile = function (file) {

    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      if (file) {
        reader.readAsDataURL(file);
      } else {
        preview.src = '';
      }
    }
  };

  fileChooser.addEventListener('change', function () {
    uploadFile(fileChooser.files[0]);
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

    // var dt = e.dataTransfer;
    // var files = dt.files;
    var files = e.dataTransfer.getData('id', e.currentTarget.id);
    uploadFile(files);
  }

  dropZoneElement.addEventListener('dragenter', dragenter, false);
  dropZoneElement.addEventListener('dragover', dragover, false);
  dropZoneElement.addEventListener('drop', drop, false);


})();
