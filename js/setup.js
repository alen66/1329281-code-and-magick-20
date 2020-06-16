'use strict';

(function () {

  var userDialogElement = document.querySelector('.setup');

  var perem = function arrayRandElement(arr) {
    var rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
  };

  var wizards = [];

  for (var i = 0; i < 4; i++) {
    var wizard = {
      name: perem(window.description.WIZARD_NAMES) + ' ' + perem(window.description.WIZARD_SUBNAMES),
      coatColor: perem(window.description.WIZARD_COATCOLORS),
      eyesColor: perem(window.description.WIZARD_EYESCOLORS)
    }
   ;
    wizards [i] = wizard;
  }

  var similarListElement = userDialogElement.querySelector('.setup-similar-list');

  var similarWizardTemplateElement = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

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
  var setupPlayerElement = document.querySelector('.setup-player');
  var setupWizardCoatElement = setupPlayerElement.querySelector('.setup-wizard .wizard-coat');
  var setupWizardEyesElement = setupPlayerElement.querySelector('.setup-wizard .wizard-eyes');
  var setupWizardFireballElement = setupPlayerElement.querySelector('.setup-fireball-wrap');

  var setupCoat = function () {
    setupWizardCoatElement.style.fill = perem(window.description.WIZARD_COATCOLORS);
    setupPlayerElement.querySelector('input[name="coat-color"]').value = setupWizardCoatElement.style.fill;
  };

  var setupEyes = function () {
    setupWizardEyesElement.style.fill = perem(window.description.WIZARD_EYESCOLORS);
    setupPlayerElement.querySelector('input[name="eyes-color"]').value = setupWizardEyesElement.style.fill;
  };

  var setupFireball = function () {
    setupWizardFireballElement.style.background = perem(window.description.WIZARD_FIREBALLS);
    setupPlayerElement.querySelector('input[name="fireball-color"]').value = setupWizardFireballElement.style.background;
  };

  setupWizardCoatElement.addEventListener('click', setupCoat);

  setupWizardEyesElement.addEventListener('click', setupEyes);

  setupWizardFireballElement.addEventListener('click', setupFireball);
})();


