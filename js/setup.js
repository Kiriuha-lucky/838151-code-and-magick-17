'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var wizardFragment = document.createDocumentFragment();
var templateWizard = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var containerWizard = document.querySelector('.setup-similar-list');
var inputName = document.querySelector('.setup-user-name');
var NAMES = ['Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'];
var SURNAMES = ['да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'];
var COATCOLORS = ['rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'];
var EYESCOLORS = ['black',
  'red',
  'blue',
  'yellow',
  'green'];
var FIREBALLCOLORS = ['#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'];
var setupOpen = document.querySelector('.setup-open');
var setup = document.querySelector('.setup');
var setupClose = setup.querySelector('.setup-close');
var colorCoat = setup.querySelector('.setup-wizard .wizard-coat');
var colorEyes = setup.querySelector('.setup-wizard .wizard-eyes');
var colorFireball = setup.querySelector('.setup-fireball-wrap');
var colorCoatInput = document.querySelector('.setup-wizard-appearance input[name="coat-color"]');
var colorEyesInput = document.querySelector('.setup-wizard-appearance input[name="eyes-color"]');
var colorFireballInput = document.querySelector('.setup-fireball-wrap input[name="fireball-color"]');

var createRandomNumber = function (num) {
  return Math.floor(Math.random() * num);
};

var createWizard = function () {
  var newWizard = templateWizard.cloneNode(true);
  newWizard.querySelector('.setup-similar-label').textContent = NAMES[createRandomNumber(NAMES.length)] + ' ' + SURNAMES[createRandomNumber(SURNAMES.length)];
  newWizard.querySelector('.wizard-coat').style.fill = COATCOLORS[createRandomNumber(COATCOLORS.length)];
  newWizard.querySelector('.wizard-eyes').style.fill = EYESCOLORS[createRandomNumber(EYESCOLORS.length)];
  return newWizard;
};


var createArrayWizards = function () {
  var arrayWizards = [];
  for (var i = 0; i < 4; i++) {
    arrayWizards.push(createWizard());
  }
  return arrayWizards;
};


var createContainerWizard = function () {
  createArrayWizards();
  for (var i = 0; i < 4; i++) {
    wizardFragment.append(createArrayWizards()[i]);
  }
  containerWizard.appendChild(wizardFragment);
};

createContainerWizard();


document.querySelector('.setup-similar').classList.remove('hidden');


var inputNameActive = function () {
  if (document.activeElement === inputName) {
    return true;
  }
  return false;
};


var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    if (inputNameActive() === false) {
      closePopup();
    }
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

var modifyWizard = function (modifyElement, modifyElementInput, colorArray) {
  modifyElement.style.fill = colorArray[createRandomNumber(colorArray.length)];
  modifyElementInput.value = modifyElement.style.fill;
};

colorCoat.addEventListener('click', function () {
  modifyWizard(colorCoat, colorCoatInput, COATCOLORS);
});

colorEyes.addEventListener('click', function () {
  modifyWizard(colorEyes, colorEyesInput, EYESCOLORS);
});

colorFireball.addEventListener('click', function () {
  colorFireballInput.value = FIREBALLCOLORS[createRandomNumber(FIREBALLCOLORS.length)];
  colorFireball.style.background = colorFireballInput.value;
});

var setupDialogElement = document.querySelector('.setup');
var dialogHandler = setupDialogElement.querySelector('.upload');

dialogHandler.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var dragged = false;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    dragged = true;

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    setup.style.top = (setup.offsetTop - shift.y) + 'px';
    setup.style.left = (setup.offsetLeft - shift.x) + 'px';
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    if (dragged) {
      var onClickPreventDefault = function (downEvt) {
        downEvt.preventDefault();
        dialogHandler.removeEventListener('click', onClickPreventDefault);
      };
      dialogHandler.addEventListener('click', onClickPreventDefault);
    }
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

