'use strict';

(function () {
  var API_URL = ' https://javascript.pages.academy/code-and-magick';
  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 20000;

  var prepareXHR = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;
    return xhr;
  };

  var save = function (data, onLoad, onError) {
    var xhr = prepareXHR(onLoad, onError);
    xhr.open('POST', API_URL);
    xhr.send(data);
  };

  var load = function (onLoad, onError) {
    var xhr = prepareXHR(onLoad, onError);
    xhr.open('GET', API_URL + '/data');
    xhr.send();
  };

  window.backend = {
    load: load,
    save: save
  };
})();
