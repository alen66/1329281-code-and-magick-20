'use strict';

var WIZARD_NAME = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SUBNAME = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COATCOLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYESCOLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_FIREBALL = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var MIN_NAME_LENGTH = 2;
var MAX_NAME_LENGTH = 25;

var userDialog = document.querySelector('.setup');

var perem = function arrayRandElement(arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

var wizards = [];

for (var i = 0; i < 4; i++) {
  var wizard = {
    name: perem(WIZARD_NAME) + ' ' + perem(WIZARD_SUBNAME),
    coatColor: perem(WIZARD_COATCOLOR),
    eyesColor: perem(WIZARD_EYESCOLOR)
  }
 ;
  wizards [i] = wizard;
}

var similarListElement = userDialog.querySelector('.setup-similar-list');

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

userDialog.querySelector('.setup-similar').classList.remove('hidden');

var setupOpen = document.querySelector('.setup-open');
var setupClose = userDialog.querySelector('.setup-close');
var userNameInput = userDialog.querySelector('.setup-user-name');

var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closePopup();
  }
};

var openPopup = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    openPopup();
  }
});


userNameInput.addEventListener('focus', function () {
  document.removeEventListener('keydown', onPopupEscPress);
});

userNameInput.addEventListener('blur', function () {
  document.addEventListener('keydown', onPopupEscPress);
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    closePopup();
  }
});

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

userNameInput.addEventListener('input', function () {
  var valueLength = userNameInput.value.length;

  if (valueLength < MIN_NAME_LENGTH) {
    userNameInput.setCustomValidity('Ещё ' + (MIN_NAME_LENGTH - valueLength) + ' симв.');
  } else if (valueLength > MAX_NAME_LENGTH) {
    userNameInput.setCustomValidity('Удалите лишние ' + (valueLength - MAX_NAME_LENGTH) + ' симв.');
  } else {
    userNameInput.setCustomValidity('');
  }
});

var setupPlayer = document.querySelector('.setup-player');
var setupWizardCoat = setupPlayer.querySelector('.setup-wizard .wizard-coat');
var setupWizardEyes = setupPlayer.querySelector('.setup-wizard .wizard-eyes');
var setupWizardFireball = setupPlayer.querySelector('.setup-fireball-wrap');
var classHidden = setupPlayer.querySelectorAll('input[type="hidden"]');

var setupCoat = function () {
  setupWizardCoat.style.fill = perem(WIZARD_COATCOLOR);
  classHidden[0].value = perem(WIZARD_COATCOLOR);
};

var setupEyes = function () {
  setupWizardEyes.style.fill = perem(WIZARD_EYESCOLOR);
  classHidden[1].value = perem(WIZARD_EYESCOLOR);
};

var setupFireball = function () {
  setupWizardFireball.style.background = perem(WIZARD_FIREBALL);
  classHidden[2].value = perem(WIZARD_FIREBALL);
};

setupWizardCoat.addEventListener('click', function () {
  setupCoat();
});

setupWizardEyes.addEventListener('click', function () {
  setupEyes();
});

setupWizardFireball.addEventListener('click', function () {
  setupFireball();
});
