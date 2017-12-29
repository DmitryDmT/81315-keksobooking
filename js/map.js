'use strict';

(function () {
  var PIN_MAIN_HEIGHT = 44;
  var mapMinHeight = 125;
  var mapMaxHeight = 655;
  var mapPinMain = window.pin.mapPins.querySelector('.map__pin--main');

  var mapPinMainMouseUpHandler = function () {
    window.utils.mapBlock.classList.remove('map--faded');
    window.load(window.pin.getEnabledPins, function (message) {
      alert(message);
    });
    window.form.getEnabledForm();

    mapPinMain.removeEventListener('mouseup', mapPinMainMouseUpHandler);
  };

  window.form.getDisabledForm();

  mapPinMain.addEventListener('mouseup', mapPinMainMouseUpHandler);
  window.showCard();
  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      if (mapPinMain.offsetTop - shift.y < mapMinHeight) {
        mapPinMain.style.top = mapMinHeight + 'px';
      }
      if (mapPinMain.offsetTop - shift.y > mapMaxHeight) {
        mapPinMain.style.top = mapMaxHeight + 'px';
      }
      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';

      window.form.noticeInputAddress.value = 'x: ' + (mapPinMain.offsetLeft - shift.x) + ', ' + 'y: ' + (mapPinMain.offsetTop - shift.y + PIN_MAIN_HEIGHT);
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });
})();
