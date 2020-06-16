'use strict';

(function () {
  var userDialogElement = document.querySelector('.setup');
  var setupOpenElement = document.querySelector('.setup-open');
  var setupCloseElement = userDialogElement.querySelector('.setup-close');
  var userNameInputElement = userDialogElement.querySelector('.setup-user-name');

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === 27) {
      closePopup();
    }
  };

  var openPopup = function () {
    userDialogElement.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    userDialogElement.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  setupOpenElement.addEventListener('click', openPopup);

  setupOpenElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      openPopup();
    }
  });

  userNameInputElement.addEventListener('focus', function () {
    document.removeEventListener('keydown', onPopupEscPress);
  });

  userNameInputElement.addEventListener('blur', function () {
    document.addEventListener('keydown', onPopupEscPress);
  });

  setupCloseElement.addEventListener('click', closePopup);

  setupCloseElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      closePopup();
    }
  });


  userNameInputElement.addEventListener('invalid', function () {
    if (userNameInputElement.validity.tooShort) {
      userNameInputElement.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else if (userNameInputElement.validity.tooLong) {
      userNameInputElement.setCustomValidity('Имя не должно превышать 25-ти символов');
    } else if (userNameInputElement.validity.valueMissing) {
      userNameInputElement.setCustomValidity('Обязательное поле');
    } else {
      userNameInputElement.setCustomValidity('');
    }
  });

  userNameInputElement.addEventListener('input', function () {
    var valueLength = userNameInputElement.value.length;

    if (valueLength < window.description.MIN_NAME_LENGTH) {
      userNameInputElement.setCustomValidity('Ещё ' + (window.description.MIN_NAME_LENGTH - valueLength) + ' симв.');
    } else if (valueLength > window.description.MAX_NAME_LENGTH) {
      userNameInputElement.setCustomValidity('Удалите лишние ' + (valueLength - window.description.MAX_NAME_LENGTH) + ' симв.');
    } else {
      userNameInputElement.setCustomValidity('');
    }
  });

})();

