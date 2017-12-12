'use strict';

(function () {
  var PIN_MAIN_HEIGHT = 44;
  var mapMinHeight = 125;
  var mapMaxHeight = 655;
  var mapPinMain = window.pin.mapPins.querySelector('.map__pin--main');
  var clickedElement;

  var getPinAndPopupActivate = function (target) {
    clickedElement = target;
    clickedElement.classList.add('map__pin--active');
    window.card.getPopupOpen(clickedElement);
  };

  var mapPinMainMouseUpHandler = function () {
    window.utils.mapBlock.classList.remove('map--faded');
    window.pin.getEnabledPins();
    window.form.getEnabledForm();

    mapPinMain.removeEventListener('mouseup', mapPinMainMouseUpHandler);
  };

  var mapPinClickHandler = function (evt) {
    window.card.getPopupClose();

    if (evt.target.parentNode.classList.contains('map__pin')) {
      getPinAndPopupActivate(evt.target.parentNode);
    } else if (evt.target.classList.contains('map__pin')) {
      getPinAndPopupActivate(evt.target);
    }
  };

  var mapPinKeydownHandler = function (evt) {
    if (evt.keyCode === window.utils.ENTER_KEYCODE) {
      if (evt.target.classList.contains('map__pin')) {
        window.card.getPopupClose();
        getPinAndPopupActivate(evt.target);
      }
    }
  };

  window.form.getDisabledForm();

  mapPinMain.addEventListener('mouseup', mapPinMainMouseUpHandler);
  window.pin.mapPins.addEventListener('click', mapPinClickHandler);
  window.pin.mapPins.addEventListener('keydown', mapPinKeydownHandler);

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

      window.form.inputAddress.value = 'x: ' + (mapPinMain.offsetLeft - shift.x) + ', ' + 'y: ' + (mapPinMain.offsetTop - shift.y + PIN_MAIN_HEIGHT);
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
