'use strict';

(function () {
  var MAX_SIMILAR_WIZARD_COUNT = 4;
  var userDialogElement = document.querySelector('.setup');

  var perem = function arrayRandElement(arr) {
    var rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
  };

  var similarListElement = userDialogElement.querySelector('.setup-similar-list');

  var similarWizardTemplateElement = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var renderWizard = function (player) {
    var wizardElement = similarWizardTemplateElement.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = player.name;
    wizardElement.querySelector('.wizard-coat').style.fill = player.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = player.colorEyes;
    return wizardElement;
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var successHandler = function (wizards) {

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < MAX_SIMILAR_WIZARD_COUNT; i++) {
      var randomWizard = Math.floor(Math.random() * wizards.length);
      fragment.appendChild(renderWizard(wizards[randomWizard]));
    }
    similarListElement.appendChild(fragment);

    userDialogElement.querySelector('.setup-similar').classList.remove('hidden');
  };

  window.backend.load(successHandler, errorHandler);

  var form = userDialogElement.querySelector('.setup-wizard-form');

  var submitHandler = function (evt) {
    window.backend.save(new FormData(form), function () {
      userDialogElement.classList.add('hidden');
    },
    errorHandler
    );
    evt.preventDefault();
  };
  form.addEventListener('submit', submitHandler);

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


