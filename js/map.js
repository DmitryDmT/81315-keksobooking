'use strict';

(function () {
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
})();
