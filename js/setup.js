'use strict';

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var WIZARD_NAME = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SUBNAME = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COATCOLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYESCOLOR = ['black', 'red', 'blue', 'yellow', 'green'];


var perem = function arrayRandElement(arr) {
  var rand = Math.floor(Math.random() * arr.length);
  var prm = arr[rand];
  return prm;
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

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');


var renderWizard = function (player) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = player.name;
  wizardElement.querySelector('.wizard-coat').style.fill = player.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = player.eyesColor;
  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var j = 0; j < wizards.length; j++) {
  fragment.appendChild(renderWizard(wizards[j]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
