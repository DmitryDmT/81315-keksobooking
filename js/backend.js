'use strict';

(function () {
  var SUCCESS_STATUS = 200;

  window.upload = function (data, onLoad, onError) {
    var URL = 'https://js.dump.academy/keksobooking';
    var TIMEOUT_UPLOAD = 10000;
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case SUCCESS_STATUS:
          onLoad(xhr.response);
          break;
        default:
          onError('Неизвестная ошибка: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Время ожидания ответа ' + xhr.timeout + 'мс истекло');
    });

    xhr.timeout = TIMEOUT_UPLOAD;

    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.load = function (onLoad, onError) {
    var URL = 'https://js.dump.academy/keksobooking/data';
    var TIMEOUT_LOAD = 10000;
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case SUCCESS_STATUS:
          onLoad(xhr.respone);
          break;
        default:
          onError('Неизвестная ошибка: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_LOAD;

    xhr.open('GET', URL);
    xhr.send();
  };
})();
