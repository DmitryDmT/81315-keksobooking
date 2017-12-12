'use strict';

(function () {
  var mapPins = window.utils.mapBlock.querySelector('.map__pins');

  var renderMapPins = function (advertisement) {
    var fragment = document.createDocumentFragment();
    var mapPinWidth = 40;
    var mapPinHeight = 62;
    for (var i = 0; i < window.data.advertisements.length; i++) {
      var mapPin = document.createElement('button');

      mapPin.className = 'map__pin';
      mapPin.style.left = advertisement[i].location.x - mapPinWidth / 2 + 'px';
      mapPin.style.top = advertisement[i].location.y + mapPinHeight + 'px';
      mapPin.innerHTML = '<img src="' + advertisement[i].author.avatar + '" width="40" height="40" draggable="false">';
      mapPin.dataset.adIndex = i;

      fragment.appendChild(mapPin);
    }

    return fragment;
  };

  var getEnabledPins = function () {
    var renderedMapPins = renderMapPins(window.data.advertisements);
    mapPins.appendChild(renderedMapPins);
  };

  window.pin = {
    mapPins: mapPins,
    getEnabledPins: getEnabledPins
  };
})();
