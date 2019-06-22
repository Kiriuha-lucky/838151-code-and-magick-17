'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var fragment = document.createDocumentFragment();
var templateWizard = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var wizardContainer = document.querySelector('.setup-similar-list');
var arrayNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var arraySurnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var arrayCoatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var arrayEyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
var arrayFireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var createRandomCount = function (num) {
  return Math.floor(Math.random() * num);
};

for (var i = 0; i < 4; i++) {
  var newElement = templateWizard.cloneNode(true);
  newElement.querySelector('.setup-similar-label').textContent = arrayNames[createRandomCount(arrayNames.length)] + ' ' + arraySurnames[createRandomCount(arraySurnames.length)];
  newElement.querySelector('.wizard-coat').style.fill = arrayCoatColors[createRandomCount(arrayCoatColors.length)];
  newElement.querySelector('.wizard-eyes').style.fill = arrayEyesColors[createRandomCount(arrayEyesColors.length)];
  fragment.appendChild(newElement);
}

wizardContainer.appendChild(fragment);

document.querySelector('.setup-similar').classList.remove('hidden');

var setupOpen = document.querySelector('.setup-open');
var setup = document.querySelector('.setup');
var setupClose = setup.querySelector('.setup-close');
var colorCoat = setup.querySelector('.setup-wizard .wizard-coat');
var colorEyes = setup.querySelector('.setup-wizard .wizard-eyes');
var colorFireball = setup.querySelector('.setup-fireball-wrap');


var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  setup.style.top = '80px';
  setup.style.left = '50%';
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

colorCoat.addEventListener('click', function () {
  colorCoat.style.fill = arrayCoatColors[createRandomCount(arrayCoatColors.length)];
  document.querySelector('.setup-wizard-appearance input[name="coat-color"]').value = colorCoat.style.fill;
});

colorEyes.addEventListener('click', function () {
  colorEyes.style.fill = arrayEyesColors[createRandomCount(arrayEyesColors.length)];
  document.querySelector('.setup-wizard-appearance input[name="eyes-color"]').value = colorEyes.style.fill;
});

colorFireball.addEventListener('click', function () {
  document.querySelector('.setup-fireball-wrap input[name="fireball-color"]').value = arrayFireballColors[createRandomCount(arrayFireballColors.length)];
  colorFireball.style.background = document.querySelector('.setup-fireball-wrap input[name="fireball-color"]').value;
});

