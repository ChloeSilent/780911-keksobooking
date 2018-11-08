'use strict';
// модуль avatar.js

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var AD_PHOTO_ALT = 'фотография предложения';
  var AD_PHOTO_WIDTH = '70';
  var AD_PHOTO_HEIGHT = '70';

  window.avatar = {};

  var fileChooserAvatarElement = document.querySelector('.ad-form__field input[type=file]');
  var previewAvatarElement = document.querySelector('.ad-form-header__preview img');
  var dropZoneAvatarElement = document.querySelector('.ad-form__field');


  var fileChooserPhotoAdElement = document.querySelector('.ad-form__upload input[type=file]');
  var dropZonePhotoAdElement = document.querySelector('.ad-form__upload');
  var adFormPhotoContainerElement = document.querySelector('.ad-form__photo-container');


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
      }
    }
  };

  fileChooserAvatarElement.addEventListener('change', function () {
    uploadFile(fileChooserAvatarElement.files[0]);
  });

  function onDragEnter(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  function onDragOver(e) {
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

  var onFileLoad = function (reader) {

    var newDiv = document.createElement('div');
    newDiv.className = 'ad-form__photo';

    var newPhoto = document.createElement('img');
    newPhoto.className = 'photoAd';
    newPhoto.src = reader.result;
    newPhoto.alt = AD_PHOTO_ALT;
    newPhoto.width = AD_PHOTO_WIDTH;
    newPhoto.height = AD_PHOTO_HEIGHT;
    newDiv.appendChild(newPhoto);
    adFormPhotoContainerElement.appendChild(newDiv);

  };

  var uploadPhotos = function (file) {

    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        onFileLoad(reader);
      });

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  };


  fileChooserPhotoAdElement.addEventListener('change', function () {

    Array.from(fileChooserPhotoAdElement.files).forEach(function (file) {
      uploadPhotos(file);
    });

  });

  function onDropZonePhotoAdElement(e) {
    e.stopPropagation();
    e.preventDefault();

    var dt = e.dataTransfer;
    var files = dt.files;

    Array.from(files).forEach(function (file) {
      uploadPhotos(file);

    });

  }


  dropZoneAvatarElement.addEventListener('dragenter', onDragEnter, false);
  dropZoneAvatarElement.addEventListener('dragover', onDragOver, false);
  dropZoneAvatarElement.addEventListener('drop', drop, false);

  dropZonePhotoAdElement.addEventListener('dragenter', onDragEnter, false);
  dropZonePhotoAdElement.addEventListener('dragover', onDragOver, false);
  dropZonePhotoAdElement.addEventListener('drop', onDropZonePhotoAdElement, false);
})();
