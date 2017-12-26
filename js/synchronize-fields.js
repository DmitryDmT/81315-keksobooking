'use strict';

(function() {
  window.synchronizeFields = function (firstElement, secondElement, firstArray, secondArray, callback) {
    for (var i = 0; i < firstArray.length; i++) {
      if (firstElement.value === firstArray[i]) {
        firstElement.value = secondArray[i];
      }
    }
    
    if (typeof callback === 'function') {
      callback(secondElement, firstElement.value);
    }
  };
})();
