// 'use strict';
// // модуль avatar.js

// (function () {

//   window.avatar = {};

//   var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];


//   var fileChooserAvatarElement = document.querySelector('.ad-form__field input[type=file]');
//   var previewAvatarElement = document.querySelector('.ad-form-header__preview').querySelector('img');
//   var dropZoneAvatarElement = document.querySelector('.ad-form__field');

//   var uploadFile = function (file) {

//     var fileName = file.name.toLowerCase();

//     var matches = FILE_TYPES.some(function (it) {
//       return fileName.endsWith(it);
//     });

//     if (matches) {
//       var reader = new FileReader();

//       reader.addEventListener('load', function () {
//         previewAvatarElement.src = reader.result;
//       });

//       if (file) {
//         reader.readAsDataURL(file);
//       } else {
//         previewAvatarElement.src = '';
//       }
//     }
//   };

//   fileChooserAvatarElement.addEventListener('change', function () {
//     uploadFile(fileChooserAvatarElement.files[0]);
//   });

//   function dragenter(e) {
//     e.stopPropagation();
//     e.preventDefault();
//   }

//   function dragover(e) {
//     e.stopPropagation();
//     e.preventDefault();
//   }

//   function drop(e) {
//     e.stopPropagation();
//     e.preventDefault();

//     var dt = e.dataTransfer;
//     var files = dt.files;
//     Array.from(files).forEach(uploadFile);

//   }

//   dropZoneAvatarElement.addEventListener('dragenter', dragenter, false);
//   dropZoneAvatarElement.addEventListener('dragover', dragover, false);
//   dropZoneAvatarElement.addEventListener('drop', drop, false);

//   /* ------------------------------------------------------------  */

//   var fileChooserPhotoAdElement = document.querySelector('.ad-form__upload input[type=file]');
//   var previewPhotoAdElement = document.querySelector('.ad-form__photo');
//   var dropZonePhotoAdElement = document.querySelector('.ad-form__upload');
//   var adFormPhotoContainerElement = document.querySelector('.ad-form__photo-container');

//   var createPhotoContainer = function (file) {


//     var newDiv = document.createElement('div');

//     newDiv.className = 'ad-form__photo';
//     previewPhotoAdElement.appendChild(newDiv);

//     var newPhoto = document.createElement('img');
//     newPhoto.className = 'photoAd';
//     newPhoto.src = 'img/muffin-grey.svg';
//     newPhoto.alt = 'фотография предложения';
//     newPhoto.width = '70';
//     newPhoto.height = '70';
//     newDiv.appendChild(newPhoto);


//     var uploadPhotos = function () {
//       var previewElement = document.querySelector('.ad-form__photo').querySelector('.photoAd');
//       var fileName = file.name.toLowerCase();

//       var matches = FILE_TYPES.some(function (it) {
//         return fileName.endsWith(it);
//       });

//       if (matches) {
//         var reader = new FileReader();

//         reader.addEventListener('load', function () {

//           previewElement.src = reader.result;
//         });

//         if (file) {
//           reader.readAsDataURL(file);
//         } else {
//           previewElement.src = '';
//         }
//       }
//     };
//     uploadPhotos(file);
//   };

//   fileChooserAvatarElement.addEventListener('change', function () {
//     createPhotoContainer(fileChooserPhotoAdElement.files[0]);

//   });

//   function dropdropZonePhotoAdElement(e) {
//     e.stopPropagation();
//     e.preventDefault();

//     var dt = e.dataTransfer;
//     var files = dt.files;

//     Array.from(files).forEach(createPhotoContainer);

//   }

//   dropZonePhotoAdElement.addEventListener('dragenter', dragenter, false);
//   dropZonePhotoAdElement.addEventListener('dragover', dragover, false);
//   dropZonePhotoAdElement.addEventListener('drop', dropdropZonePhotoAdElement, false);
// })();


// // var newDiv = document.createElement('div');
// // newDiv.className = 'ad-form__photo';
// // previewPhotoAdElement.appendChild(newDiv);

// // var newPhoto = document.createElement('img');
// // newPhoto.className = 'photoAd';
// // newDiv.appendChild(newPhoto);


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

  /* ------------------------------------------------------------  */

  var fileChooserPhotoAdElement = document.querySelector('.ad-form__upload input[type=file]');
  var previewPhotoAdElement = document.querySelector('.ad-form__photo');
  var dropZonePhotoAdElement = document.querySelector('.ad-form__upload');
  var adFormPhotoContainerElement = document.querySelector('.ad-form__photo-container');

  // var createPhotoContainer = function (file) {


  //   var newDiv = document.createElement('div');

  //   newDiv.className = 'ad-form__photo';
  //   previewPhotoAdElement.appendChild(newDiv);

  //   var newPhoto = document.createElement('img');
  //   newPhoto.className = 'photoAd';
  //   newPhoto.src = 'img/muffin-grey.svg';
  //   newPhoto.alt = 'фотография предложения';
  //   newPhoto.width = '70';
  //   newPhoto.height = '70';
  //   newDiv.appendChild(newPhoto);
  //   adFormPhotoContainerElement.appendChild(newDiv);
  // };
  var uploadPhotos = function (file) {
    // var previewElement = document.querySelector('.ad-form__photo').querySelector('.photoAd');

    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var newDiv = document.createElement('div');
        newDiv.className = 'ad-form__photo';
        previewPhotoAdElement.appendChild(newDiv);

        var newPhoto = document.createElement('img');
        newPhoto.className = 'photoAd';
        newPhoto.src = reader.result;
        newPhoto.alt = 'фотография предложения';
        newPhoto.width = '70';
        newPhoto.height = '70';
        newDiv.appendChild(newPhoto);
        adFormPhotoContainerElement.appendChild(newDiv);

      });

      if (file) {
        reader.readAsDataURL(file);
        // } else {
        //   previewElement.src = '';
      }
    }
  };

  // fileChooserPhotoAdElement.addEventListener('change', function () {
  //   for (var i = 0; i < 2; i++) {
  //     createPhotoContainer(fileChooserPhotoAdElement.files[i]);
  //   }
  //   // createPhotoContainer(fileChooserPhotoAdElement.files[0]);
  // });
  fileChooserPhotoAdElement.addEventListener('change', function () {

    Array.from(fileChooserPhotoAdElement.files).forEach(function (file) {
      uploadPhotos(file);

    });

  });

  function dropdropZonePhotoAdElement(e) {
    e.stopPropagation();
    e.preventDefault();

    var dt = e.dataTransfer;
    var files = dt.files;

    Array.from(files).forEach(function (file) {
      uploadPhotos(file);

    });

  }

  dropZonePhotoAdElement.addEventListener('dragenter', dragenter, false);
  dropZonePhotoAdElement.addEventListener('dragover', dragover, false);
  dropZonePhotoAdElement.addEventListener('drop', dropdropZonePhotoAdElement, false);
})();


// var newDiv = document.createElement('div');
// newDiv.className = 'ad-form__photo';
// previewPhotoAdElement.appendChild(newDiv);

// var newPhoto = document.createElement('img');
// newPhoto.className = 'photoAd';
// newDiv.appendChild(newPhoto);
