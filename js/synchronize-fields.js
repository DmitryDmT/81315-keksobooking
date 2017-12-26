'use strict';

(function() {
  window.synchronizeFields = function (firstElement, secondElement, firstArray, secondArray, callback) {
    var value = firstElement.value;
    for (var i = 0; i < firstArray.length; i++) {
      if (value === firstArray[i]) {
        value = secondArray[i];
      }
    }
    
    if (typeof callback === 'function') {
      callback(secondElement, value);
    }
  };
})();
