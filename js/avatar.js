'use strict';
// модуль avatar.js

(function () {

  window.avatar = {};

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png', 'JPG'];

  var fileChooser = document.querySelector('.ad-form__field input[type=file]');
  var preview = document.querySelector('.ad-form-header__preview');

  var onFileChooserChange = function () {

    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
        // preview.setAttribute('src', e.target.result);
      });

      reader.readAsDataURL(file);
    }
  };

  var dragenter = function (e) {
    e.stopPropagation();
    e.preventDefault();
  };

  var dragover = function (e) {
    e.stopPropagation();
    e.preventDefault();
  };

  var drop = function (e) {
    e.stopPropagation();
    e.preventDefault();

    var dt = e.dataTransfer;
    var files = dt.files;

    onFileChooserChange(files);
  };

  fileChooser.addEventListener('change', onFileChooserChange);
  fileChooser.addEventListener('dragenter', dragenter, false);
  fileChooser.addEventListener('dragover', dragover, false);
  fileChooser.addEventListener('drop', drop, false);
})();
