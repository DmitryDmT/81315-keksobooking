'use strict';

(function () {
  var URL = 'dfghdfhdfdfdnh';
  
  window.upload = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    
    xhr.responseType = 'json';
    
    xhr.addEventListener('load', function (evt) {
      switch (xhr.status) {
        case 200:
          onLoad(xhr.response);
          break;
        default:
          onError('Неизвестная ошибка: ' + xhr.status + xhr.statusText);
      }
    });
    
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    
    xhr.addEventListener('timeout', function () {
      onError('Время ожидания ответа ' + xhr.timeout + 'мс истекло');
    });
    
    xhr.timeout = 10000;
    
    xhr.open('POST', URL);
    xhr.send(data);
  };
})();
