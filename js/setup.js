'use strict';

document.querySelector('.setup').classList.remove('hidden');

var fragment = document.createDocumentFragment();
var templateWizard = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var wizardContainer = document.querySelector('.setup-similar-list');
var arrayNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var arraySurnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var arrayCoatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var arrayEyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

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
