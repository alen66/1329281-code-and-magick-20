'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SUBNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COATCOLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYESCOLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_FIREBALLS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var MIN_NAME_LENGTH = 2;
var MAX_NAME_LENGTH = 25;

var userDialogElement = document.querySelector('.setup');

var perem = function arrayRandElement(arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

var wizards = [];

for (var i = 0; i < 4; i++) {
  var wizard = {
    name: perem(WIZARD_NAMES) + ' ' + perem(WIZARD_SUBNAMES),
    coatColor: perem(WIZARD_COATCOLORS),
    eyesColor: perem(WIZARD_EYESCOLORS)
  }
 ;
  wizards [i] = wizard;
}

var similarListElement = userDialogElement.querySelector('.setup-similar-list');

var similarWizardTemplateElement = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');


var renderWizard = function (player) {
  var wizardElement = similarWizardTemplateElement.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = player.name;
  wizardElement.querySelector('.wizard-coat').style.fill = player.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = player.eyesColor;
  return wizardElement;
};

var fragment = document.createDocumentFragment();

wizards.forEach(function (el) {
  fragment.appendChild(renderWizard(el));
});

similarListElement.appendChild(fragment);

userDialogElement.querySelector('.setup-similar').classList.remove('hidden');

var setupOpenElement = document.querySelector('.setup-open');
var setupCloseElement = userDialogElement.querySelector('.setup-close');
var userNameInputElement = userDialogElement.querySelector('.setup-user-name');

var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
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
  if (evt.key === 'Enter') {
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
  if (evt.key === 'Enter') {
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

  if (valueLength < MIN_NAME_LENGTH) {
    userNameInputElement.setCustomValidity('Ещё ' + (MIN_NAME_LENGTH - valueLength) + ' симв.');
  } else if (valueLength > MAX_NAME_LENGTH) {
    userNameInputElement.setCustomValidity('Удалите лишние ' + (valueLength - MAX_NAME_LENGTH) + ' симв.');
  } else {
    userNameInputElement.setCustomValidity('');
  }
});

var setupPlayerElement = document.querySelector('.setup-player');
var setupWizardCoatElement = setupPlayerElement.querySelector('.setup-wizard .wizard-coat');
var setupWizardEyesElement = setupPlayerElement.querySelector('.setup-wizard .wizard-eyes');
var setupWizardFireballElement = setupPlayerElement.querySelector('.setup-fireball-wrap');

var setupCoat = function () {
  setupWizardCoatElement.style.fill = perem(WIZARD_COATCOLORS);
  setupPlayerElement.querySelector('input[name="coat-color"]').value = setupWizardCoatElement.style.fill;
};

var setupEyes = function () {
  setupWizardEyesElement.style.fill = perem(WIZARD_EYESCOLORS);
  setupPlayerElement.querySelector('input[name="eyes-color"]').value = setupWizardEyesElement.style.fill;
};

var setupFireball = function () {
  setupWizardFireballElement.style.background = perem(WIZARD_FIREBALLS);
  setupPlayerElement.querySelector('input[name="fireball-color"]').value = setupWizardFireballElement.style.background;
};

setupWizardCoatElement.addEventListener('click', setupCoat);

setupWizardEyesElement.addEventListener('click', setupEyes);

setupWizardFireballElement.addEventListener('click', setupFireball);
