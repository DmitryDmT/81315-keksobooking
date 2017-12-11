'use strict';

(function () {
  var mapBlock = document.querySelector('.map');
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  var getRandomValue = function (arrayLength) {
    var min = 0;
    var max = arrayLength - 1;

    return Math.round(Math.random() * (max - min) + min);
  };

  var getUniqueRandomElement = function (array) {
    var randVal = getRandomValue(array.length);

    return array.splice(randVal, 1)[0];
  };

  var getRandomElement = function (array) {
    var result = getRandomValue(array.length);

    return array[result];
  };

  var getRandomNumber = function (min, max) {
    return Math.round(Math.random() * (max - min) + min);
  };
  
  window.utils = {
    ENTER_KEYCODE: ENTER_KEYCODE,
    ESC_KEYCODE: ESC_KEYCODE,
    getRandomValue: getRandomValue,
    getUniqueRandomElement: getUniqueRandomElement,
    getRandomElement: getRandomElement,
    getRandomNumber: getRandomNumber,
    mapBlock: mapBlock
  };
})();
